import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useEthersProvider } from './useEthersProvider'
import { useEthersSigner } from './useEthersSigner'

// import { getDefaultChainId } from '@/utils/web3/chain'

export const useProviderOrSigner = (withSignerIfPossible = true) => {
  const provider = useEthersProvider(/* { chainId: getDefaultChainId() } */)
  const { address, isConnected } = useAccount()
  const signer = useEthersSigner()

  return useMemo(
    () =>
      withSignerIfPossible && address && isConnected && signer
        ? signer
        : provider,
    [address, isConnected, provider, signer, withSignerIfPossible],
  )
}
