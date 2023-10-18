import { IEO } from '@/constants/contract/contractTypes'
import { BigNumberish } from 'ethers'

interface IeoCallParams {
  contract: IEO
}

export const aibotTotalAmountCall = async ({ contract }: IeoCallParams) => {
  return contract.aibotTotalAmount()
}

export interface DepositsCallParams extends IeoCallParams {
  address: string
}
export const depositsCall = async ({
  contract,
  address,
}: DepositsCallParams) => {
  return contract.deposits(address)
}

export interface DepositCallParams extends IeoCallParams {
  amount: BigNumberish
}
export const depositCall = async ({ contract, amount }: DepositCallParams) => {
  return (await contract.deposit(amount)).wait()
}

export interface PurchaseCallParams extends IeoCallParams {
  amount: BigNumberish
}
export const purchaseCall = async ({
  contract,
  amount,
}: PurchaseCallParams) => {
  return (await contract.purchase(amount)).wait()
}

export interface PaymentsCallParams extends IeoCallParams {
  address: string
}
export const paymentsCall = async ({
  contract,
  address,
}: PaymentsCallParams) => {
  return contract.payments(address)
}

export interface PurchaseAmountCallParams extends IeoCallParams {
  address: string
}
export const purchaseAmountCall = async ({
  contract,
  address,
}: PurchaseAmountCallParams) => {
  console.log('>>>>address', address)
  return contract.getPurchaseAmount(address)
}

export interface GetFinalAllocationCallParams extends IeoCallParams {
  address: string
}
export const getFinalAllocationCall = async ({
  contract,
  address,
}: GetFinalAllocationCallParams) => {
  return contract.getFinalAllocation(address)
}

export interface ClaimCallParams extends IeoCallParams {}
export const claimCall = async ({ contract }: ClaimCallParams) => {
  return (await contract.claim()).wait()
}

export const startTimeCall = async ({ contract }: IeoCallParams) => {
  return contract.startTime()
}
export const depositDeadlineCall = async ({ contract }: IeoCallParams) => {
  return contract.depositDeadline()
}
export const paymentDeadlineCall = async ({ contract }: IeoCallParams) => {
  return contract.paymentDeadline()
}
