import { useMemo } from 'react'

import { Contract } from 'ethers'
import { useNetwork } from 'wagmi'
import { useProviderOrSigner } from './useProviderOrSigner'
import { getContract } from '@/utils/contract'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)

  // const canReturnContract = useMemo(
  //   () => address && ABI && providerOrSigner,
  //   [address, ABI, providerOrSigner],
  // )

  return useMemo(() => {
    if (!(address && ABI && providerOrSigner)) return null
    try {
      return getContract(address, ABI, providerOrSigner)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, providerOrSigner]) as T
}
