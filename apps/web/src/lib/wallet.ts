import { encodeFunctionData, keccak256, parseUnits, toHex, type Abi, type Address } from "viem";
type Provider = { request(args:{method:string;params?:unknown[]}):Promise<unknown> };
const escrowAbi = [
  {type:"function",name:"approve",stateMutability:"nonpayable",inputs:[{name:"id",type:"uint256"}],outputs:[]},
  {type:"function",name:"submitDelivery",stateMutability:"nonpayable",inputs:[{name:"id",type:"uint256"},{name:"deliveryHash",type:"bytes32"},{name:"deliveryUri",type:"string"}],outputs:[]},
  {type:"function",name:"openDispute",stateMutability:"nonpayable",inputs:[{name:"id",type:"uint256"},{name:"reasonHash",type:"bytes32"}],outputs:[]},
  {type:"function",name:"resolveDispute",stateMutability:"nonpayable",inputs:[{name:"id",type:"uint256"},{name:"freelancerShare",type:"uint128"}],outputs:[]},
] as const;
const factoryAbi = [{type:"function",name:"createProject",stateMutability:"nonpayable",inputs:[{name:"projectId",type:"bytes32"},{name:"freelancer",type:"address"},{name:"token",type:"address"},{name:"reviewPeriod",type:"uint64"},{name:"amounts",type:"uint128[]"},{name:"dueDates",type:"uint64[]"}],outputs:[{name:"escrow",type:"address"}]}] as const;
export function hashText(value:string){ return keccak256(toHex(value)); }
export function usdc(value:string|number){ return parseUnits(String(value).replaceAll(",",""),6); }
export async function sendEscrow(address:Address,functionName:"approve"|"submitDelivery"|"openDispute"|"resolveDispute",args:readonly unknown[]){ const provider=(window as typeof window & {ethereum?:Provider}).ethereum;if(!provider)throw new Error("No browser wallet found.");const accounts=await provider.request({method:"eth_requestAccounts"}) as Address[];const data=encodeFunctionData({abi:escrowAbi as Abi,functionName,args});return provider.request({method:"eth_sendTransaction",params:[{from:accounts[0],to:address,data}]}) as Promise<string>; }
export async function createEscrow(factory:Address,args:readonly unknown[]){ const provider=(window as typeof window & {ethereum?:Provider}).ethereum;if(!provider)throw new Error("No browser wallet found.");const accounts=await provider.request({method:"eth_requestAccounts"}) as Address[];const data=encodeFunctionData({abi:factoryAbi as Abi,functionName:"createProject",args});return provider.request({method:"eth_sendTransaction",params:[{from:accounts[0],to:factory,data}]}) as Promise<string>; }
