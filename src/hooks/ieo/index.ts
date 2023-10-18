import { useAccount, useNetwork } from 'wagmi'
import { useProviderOrSigner } from '../useProviderOrSigner'
import { useMemo } from 'react'
import { getIeoContract } from '@/utils/contract'
import {
  ClaimCallParams,
  DepositCallParams,
  PurchaseCallParams,
  aibotTotalAmountCall,
  claimCall,
  depositCall,
  depositDeadlineCall,
  depositsCall,
  getFinalAllocationCall,
  paymentDeadlineCall,
  paymentsCall,
  purchaseAmountCall,
  purchaseCall,
  startTimeCall,
} from './contractCalls'
import { useCountDown, useRequest } from 'ahooks'
import { toast } from 'react-toastify'

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
      refreshDeps: [address],
      // cacheKey: 'payments',
      onError: (error) => {
        console.log('payments: ', error)
      },
    },
  )
}

export const useAibotTotalAmount = () => {
  const contract = useIeoContract()

  console.log('contract: ', contract)

  const { isConnected } = useAccount()

  return useRequest(
    () => {
      return aibotTotalAmountCall({ contract })
    },
    {
      ready: isConnected,
      // cacheKey: 'aibotTotalAmount',
      refreshDeps: [isConnected],
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
      refreshDeps: [address],
      // cacheKey: 'deposits',
      onError: (error) => {
        console.log('deposits: ', error)
      },
    },
  )
}

export const useFinalAllocation = () => {
  const contract = useIeoContract()
  const { address } = useAccount()

  return useRequest(
    () => {
      if (!address) {
        return Promise.reject(new Error('Not connected'))
      }

      return getFinalAllocationCall({ contract, address })
    },
    {
      // ready: !!address,
      refreshDeps: [address],
      // cacheKey: 'deposits',
      onError: (error) => {
        console.log('getFinalAllocationCall: ', error)
      },
    },
  )
}

// export const usePurchaseAmount = () => {
//   const contract = useIeoContract()
//   const { address } = useAccount()

//   return useRequest(
//     () => {
//       if (!address) {
//         return Promise.reject(new Error('Not connected'))
//       }

//       return getPurchaseAmountCall({ contract, address })
//     },
//     {
//       // ready: !!address,
//       refreshDeps: [address],
//       // cacheKey: 'getPurchaseAmoun',
//       onError: (error) => {
//         console.log('getPurchaseAmoun: ', error)
//       },
//     },
//   )
// }

export const usePurchaseAmount = () => {
  const contract = useIeoContract()
  const { address } = useAccount()

  return useRequest(
    () => {
      if (!address) {
        return Promise.reject(new Error('Not connected'))
      }

      // return paymentsCall({ contract, address })
      return purchaseAmountCall({ contract, address })
    },
    {
      // ready: !!address,
      refreshDeps: [address],
      // cacheKey: 'payments',
      onError: (error) => {
        console.log('payments: ', error)
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
        toast.error('Fail to deposit.')
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
        toast.error('Fail to commit.')
        console.log('purchase error: ', error)
      },
    },
  )
}

export const useClaim = (options?: { onSuccess?: () => void }) => {
  const contract = useIeoContract()

  return useRequest(
    () => {
      return claimCall({ contract })
    },
    {
      manual: true,
      onSuccess: options?.onSuccess,
      onError: (error) => {
        console.log('claim error: ', error)
      },
    },
  )
}

export const useStartTime = () => {
  const contract = useIeoContract()

  return useRequest(
    () => {
      return startTimeCall({ contract })
    },
    {
      onError: (error) => {
        console.log('startTime error: ', error)
      },
    },
  )
}
export const useDepositDeadline = () => {
  const contract = useIeoContract()

  return useRequest(
    () => {
      return depositDeadlineCall({ contract })
    },
    {
      onError: (error) => {
        console.log('depositDeadline error: ', error)
      },
    },
  )
}
export const usePaymentDeadlineCall = () => {
  const contract = useIeoContract()

  return useRequest(
    () => {
      return paymentDeadlineCall({ contract })
    },
    {
      onError: (error) => {
        console.log('paymentDeadline error: ', error)
      },
    },
  )
}

export const useStartTimeCountDown = (options?: { onEnd: () => void }) => {
  const { data: startTime } = useStartTime()

  return useCountDown({
    targetDate: startTime ? startTime?.toNumber() * 1000 : undefined,
    onEnd: options?.onEnd,
  })
}

export const useDepositEndCountdown = (options?: { onEnd?: () => void }) => {
  const { data: depositEndTime } = useDepositDeadline()

  const countdown = useCountDown({
    targetDate: depositEndTime ? depositEndTime?.toNumber() * 1000 : undefined,
    // targetDate: depositEndTime ? '2023-10-18 17:21:00' : undefined,
    onEnd: options?.onEnd,
  })

  return { countdown, isValid: !!depositEndTime }
}

export const usePaymentEndCountdown = (options?: { onEnd?: () => void }) => {
  const { data: paymentEndTime } = usePaymentDeadlineCall()

  // console.log('paymentEndTime: ', new Date(paymentEndTime?.toNumber() * 1000))

  const countdown = useCountDown({
    targetDate: paymentEndTime ? paymentEndTime?.toNumber() * 1000 : undefined,
    // targetDate: paymentEndTime ? '2023-10-18 13:59:00' : undefined,
    onEnd: options?.onEnd,
  })

  return { countdown, isValid: !!paymentEndTime }
}
