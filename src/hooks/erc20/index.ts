import { Erc20 } from '@/constants/contract/contractTypes'
import ERC20_ABI from '@/constants/contract/abis/Erc20.json'
import { useContract } from '../useContract'
import { useRequest } from 'ahooks'
import { allowanceCall, approveCall, balanceOfCall } from './contractCalls'
import { BigNumberish } from 'ethers'
import { useAccount } from 'wagmi'

export function useBrc20Contract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export const useAllowance = (tokenAddress: string, spenderAddress: string) => {
  const contract = useBrc20Contract(tokenAddress)
  const { address: account } = useAccount()

  return useRequest(
    async () => {
      if (!contract) {
        return Promise.reject(new Error('No Erc20 contract address'))
      }
      if (!account) {
        return Promise.reject(new Error('Not connected'))
      }
      return allowanceCall(contract, account, spenderAddress)
    },
    {
      ready: !!tokenAddress && !!spenderAddress,
      refreshDeps: [tokenAddress],
    },
  )
}

export const useApprove = (
  tokenAddress: string,
  options?: { onSuccess: () => void },
) => {
  const contract = useBrc20Contract(tokenAddress)

  return useRequest(
    async (spender: string, amountToApprove: BigNumberish) => {
      if (!contract) {
        return Promise.reject(new Error('No Erc20 contract address'))
      }
      return approveCall(contract, spender, amountToApprove)
    },
    {
      manual: true,
      ready: !!contract,
      onSuccess: () => {
        options?.onSuccess?.()
      },
    },
  )
}

export const useBalanceOf = ({
  tokenAddress,
  ownerAddress,
  ready,
}: {
  tokenAddress: string
  ownerAddress?: string
  ready?: boolean
}) => {
  const contract = useBrc20Contract(tokenAddress)

  return useRequest(
    async () => {
      if (!contract) {
        return Promise.reject(new Error('No Erc20 contract address'))
      }
      if (!ownerAddress) {
        return Promise.reject(new Error('Not connected'))
      }
      return balanceOfCall(contract, ownerAddress)
    },
    {
      ready: ready || true,
      refreshDeps: [ownerAddress, contract],
      // cacheKey: `${tokenAddress}-${ownerAddress}`,
    },
  )
}
