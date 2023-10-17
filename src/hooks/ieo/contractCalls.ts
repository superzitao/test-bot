import { IEO } from '@/constants/contract/contractTypes'
import { BigNumberish } from 'ethers'

interface IeoCallParams {
  contract: IEO
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

export interface GetPurchaseAmountCallCallParams extends IeoCallParams {
  address: string
}
export const getPurchaseAmountCall = async ({
  contract,
  address,
}: GetPurchaseAmountCallCallParams) => {
  return await contract.getPurchaseAmount(address)
}
