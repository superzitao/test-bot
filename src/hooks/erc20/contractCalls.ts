import { BigNumberish } from 'ethers'
import { Erc20 } from '@/constants/contract/contractTypes'

export const allowanceCall = async (
  contract: Erc20,
  owner: string,
  spender: string,
) => {
  return contract.allowance(owner, spender)
}

export const approveCall = async (
  contract: Erc20,
  spender: string,
  value: BigNumberish,
) => {
  const tx = await contract.approve(spender, value)
  const receipt = await tx.wait(1)
  return receipt
}

export const balanceOfCall = async (contract: Erc20, address: string) => {
  return contract.balanceOf(address)
}
