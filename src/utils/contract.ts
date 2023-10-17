import { isAddress } from 'ethers/lib/utils'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from 'ethers'
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { IEO_ADDRESS } from '@/constants/token'
import IEO_ABI from '@/constants/contract/abis/IEO.json'
import { IEO } from '@/constants/contract/contractTypes'

export function getContract(
  address: string,
  ABI: any,
  signer?: Signer | Provider,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signer)
}

export const getIeoContract = (
  signer?: Signer | Provider,
  chainId?: number,
) => {
  return getContract(IEO_ADDRESS, IEO_ABI, signer) as IEO
}
