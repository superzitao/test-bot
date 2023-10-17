import { useAccount, useNetwork } from 'wagmi'
import { useProviderOrSigner } from '../useProviderOrSigner'
import { useMemo } from 'react'
import { getIeoContract } from '@/utils/contract'
import {
  DepositCallParams,
  PurchaseCallParams,
  aibotTotalAmountCall,
  depositCall,
  depositsCall,
  getPurchaseAmountCall,
  paymentsCall,
  purchaseCall,
} from './contractCalls'
import { useRequest } from 'ahooks'

export function useIeoContract(withSignerIfPossible = true) {
  const { chain } = useNetwork()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)

  return useMemo(
    () => getIeoContract(providerOrSigner, chain?.id),
    [chain?.id, providerOrSigner],
  )
}

export const usePayments = () => {
  const contract = useIeoContract()
  const { address } = useAccount()

  return useRequest(
    () => {
      if (!address) {
        return Promise.reject(new Error('Not connected'))
      }

      return paymentsCall({ contract, address })
    },
    {
      // ready: !!address,
      cacheKey: 'payments',
      onError: (error) => {
        console.log('payments: ', error)
      },
    },
  )
}

export const useAibotTotalAmount = () => {
  const contract = useIeoContract()

  return useRequest(
    () => {
      return aibotTotalAmountCall({ contract })
    },
    {
      // ready: !!address,
      cacheKey: 'aibotTotalAmount',
      onError: (error) => {
        console.log('aibotTotalAmount error: ', error)
      },
    },
  )
}

export const useUserDepositAibot = () => {
  const contract = useIeoContract()
  const { address } = useAccount()

  return useRequest(
    () => {
      if (!address) {
        return Promise.reject(new Error('Not connected'))
      }

      return depositsCall({ contract, address })
    },
    {
      // ready: !!address,
      cacheKey: 'deposits',
      onError: (error) => {
        console.log('deposits: ', error)
      },
    },
  )
}

export const usePurchaseAmount = () => {
  const contract = useIeoContract()
  const { address } = useAccount()

  return useRequest(
    () => {
      if (!address) {
        return Promise.reject(new Error('Not connected'))
      }

      return getPurchaseAmountCall({ contract, address })
    },
    {
      // ready: !!address,
      cacheKey: 'getPurchaseAmoun',
      onError: (error) => {
        console.log('getPurchaseAmoun: ', error)
      },
    },
  )
}

export const useDepositAibot = (options?: { onSuccess?: () => void }) => {
  const contract = useIeoContract()

  return useRequest(
    (params: Omit<DepositCallParams, 'contract' | 'fee'>) => {
      return depositCall({ contract, ...params })
    },
    {
      manual: true,
      onSuccess: options?.onSuccess,
      onError: (error) => {
        console.log('deposit error: ', error)
      },
    },
  )
}

export const useCommitUsdt = (options?: { onSuccess?: () => void }) => {
  const contract = useIeoContract()

  return useRequest(
    (params: Omit<PurchaseCallParams, 'contract' | 'fee'>) => {
      return purchaseCall({ contract, ...params })
    },
    {
      manual: true,
      onSuccess: options?.onSuccess,
      onError: (error) => {
        console.log('purchase error: ', error)
      },
    },
  )
}
