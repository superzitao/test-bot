import { usePayments } from '@/hooks/ieo'
import React from 'react'
import { erc20ABI, useContractRead, useNetwork } from 'wagmi'
import { readContract } from 'wagmi/actions'

const TestPage = () => {
  const AIBOT_ADDRESS = '0x4eAc1425cf22d25e76c1eA054B32C7126F9ec881'
  const IEO_ADDRESS = '0x6Aaf1F8aA62c628CF7747DCc420bcA30925A94d8'

  const { chain } = useNetwork()
  console.log('chain: ', chain)

  // const { data: readResult, isError } = useContractRead({
  //   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  //   abi: [
  //     {
  //       inputs: [],
  //       name: 'getHunger',
  //       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //       stateMutability: 'view',
  //       type: 'function',
  //     },
  //   ],
  //   functionName: 'getHunger',
  // })

  // console.log('readResult: ', readResult)

  const { data } = usePayments()
  console.log('data: ', data)

  return (
    <div>
      <w3m-button />
      <button
        onClick={async () => {
          const res = await readContract({
            address: AIBOT_ADDRESS,
            abi: erc20ABI,
            functionName: 'allowance',
            args: ['0x6ccaFDd45956853732Ec1604dA857ca99Ef73838', IEO_ADDRESS],
          })

          // const res = await readContract({
          //   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
          //   abi: [
          //     {
          //       inputs: [],
          //       name: 'getHunger',
          //       outputs: [
          //         { internalType: 'uint256', name: '', type: 'uint256' },
          //       ],
          //       stateMutability: 'view',
          //       type: 'function',
          //     },
          //   ],
          //   functionName: 'getHunger',
          // })
          console.log('res: ', res)
        }}
      >
        get allowance
      </button>
    </div>
  )
}

export default TestPage
