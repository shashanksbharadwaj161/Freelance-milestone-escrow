const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("MilestoneEscrow", function () {
  async function fixture() {
    const [owner, client, freelancer, resolver, treasury, stranger] = await ethers.getSigners();
    const token = await ethers.deployContract("MockUSDC");
    const factory = await ethers.deployContract("EscrowFactory", [owner.address, treasury.address, resolver.address, 250]);
    const now = await time.latest();
    const id = ethers.id("PROJECT-1048");
    await factory.connect(client).createProject(id, freelancer.address, token.target, 3 * 86400, [1000_000000n, 2000_000000n], [now + 86400, now + 172800]);
    const escrow = await ethers.getContractAt("MilestoneEscrow", await factory.projects(id));
    await token.mint(client.address, 3000_000000n);
    await token.connect(client).approve(escrow.target, 3000_000000n);
    await escrow.connect(client).fund(3000_000000n);
    return { client, freelancer, resolver, treasury, stranger, token, escrow };
  }

  it("releases an approved delivery and takes the configured commission", async function () {
    const { client, freelancer, treasury, token, escrow } = await fixture();
    await escrow.connect(freelancer).submitDelivery(0, ethers.id("delivery-v1"), "ipfs://delivery-v1");
    await escrow.connect(client).approve(0);
    expect(await token.balanceOf(freelancer.address)).to.equal(975_000000n);
    expect(await token.balanceOf(treasury.address)).to.equal(25_000000n);
  });

  it("auto-releases after the client review deadline", async function () {
    const { freelancer, stranger, token, escrow } = await fixture();
    await escrow.connect(freelancer).submitDelivery(0, ethers.id("delivery"), "ipfs://delivery");
    await expect(escrow.connect(stranger).autoRelease(0)).to.be.revertedWithCustomError(escrow, "ReviewPeriodActive");
    await time.increase(3 * 86400);
    await escrow.connect(stranger).autoRelease(0);
    expect(await token.balanceOf(freelancer.address)).to.equal(975_000000n);
  });

  it("lets the resolver split a disputed milestone for a partial refund", async function () {
    const { client, freelancer, resolver, token, escrow } = await fixture();
    await escrow.connect(freelancer).submitDelivery(0, ethers.id("delivery"), "ipfs://delivery");
    await escrow.connect(client).openDispute(0, ethers.id("scope mismatch"));
    await escrow.connect(resolver).resolveDispute(0, 400_000000n);
    expect(await token.balanceOf(freelancer.address)).to.equal(390_000000n);
    expect(await token.balanceOf(client.address)).to.equal(600_000000n);
  });
});
