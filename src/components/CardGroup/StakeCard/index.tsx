import {
  Box,
  Button,
  LinearProgress,
  OutlinedInput,
  Typography,
  styled,
} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { RowCenter, RowCenterBetween, RowCenterY } from '../../common'
import Link from 'next/link'
import StakeButton from '../StakeButton'
import AvailableAmount from '../../Statistics/AvailableAmount'
import TotalStatistics from './TotalStatistics'
import UserStakedAmount from './UserStakedAmount'
import Stake from './Stake'
import { useAccount, useBalance, useContractRead } from 'wagmi'
import { AIBOT_ADDRESS, IEO_ADDRESS } from '@/constants/token'
import { formatEther, parseEther } from 'viem'

const Wrapper = styled(Box)`
  margin-top: 21px;

  background: #211c32;
  padding: 24px;
  width: 428px;
  border: 1px solid rgba(256, 256, 256, 0.44);
  border-radius: 21px;

  display: flex;
  flex-direction: column;
`

const StakeCard = () => {
  const { data: aibotTotalAmount, refetch: reFetchAibotTotalAmount } =
    useContractRead({
      address: IEO_ADDRESS,
      abi: [
        {
          inputs: [],
          name: 'aibotTotalAmount',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ] as const,
      functionName: 'aibotTotalAmount',
    })

  const { address } = useAccount()
  const { data: userDepositAmount, refetch: refetchUserDepositAmount } =
    useContractRead({
      address: IEO_ADDRESS,
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'deposits',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ] as const,
      functionName: 'deposits',
      enabled: !!address,
      args: [address || '0x'],
    })

  console.log('>>>>> userDepositAmount: ', userDepositAmount?.toString())

  const { data: balance, refetch: refetchBalance } = useBalance({
    address,
    token: AIBOT_ADDRESS,
  })

  console.log('>>>>>>>>> aibotTotalAmount:', aibotTotalAmount?.toString())
  console.log(
    '>>>>>>>>> parseEther5500000000:',
    parseEther('5500000000').toString(),
  )
  console.log(
    '>>>>>>>>>  / :',
    aibotTotalAmount
      ? (aibotTotalAmount * BigInt(100)) / parseEther('5500000000')
      : '',
  )

  console.log(
    '>>>>>>>> value: ',
    aibotTotalAmount
      ? (aibotTotalAmount / parseEther('5500000000')) * BigInt(100)
      : 'nulll',
  )

  const percentage = aibotTotalAmount
    ? Number((aibotTotalAmount * BigInt(100)) / parseEther('5500000000'))
    : 0

  return (
    <Wrapper>
      <RowCenterY sx={{ gap: 8 }}>
        <Image src="/aibot.png" width={26} height={26} alt="aibot" priority />
        <Typography
          sx={{
            // color: '#FFFFFF',
            fontSize: '25px',
            fontWeight: 'bold',
          }}
        >
          AIBOT
        </Typography>
      </RowCenterY>

      <Typography
        component="span"
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',

          ml: 'auto',
          color: '#39E0E2',
        }}
      >
        {percentage}%
      </Typography>

      <LinearProgress
        sx={{
          mt: 4,
          bgcolor: '#2F2847',
          height: 8,
          borderRadius: '10px',
          '.MuiLinearProgress-bar': {
            bgcolor: '#39E0E2',
            borderRadius: '10px',
          },
        }}
        variant="determinate"
        value={percentage}
      />

      <TotalStatistics data={aibotTotalAmount} />

      <UserStakedAmount data={userDepositAmount} />

      <RowCenterBetween sx={{ mt: 30 }}>
        <AvailableAmount data={balance} />

        <Link href="/" style={{ textDecorationLine: 'none', color: 'unset' }}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#39E0E2',
              borderBottom: '1px solid',
            }}
          >
            Buy AIBOT
          </Typography>
        </Link>
      </RowCenterBetween>

      <StakeButton
        onDepositSuccess={() => {
          console.log('>>>> onDepositSuccess')
          reFetchAibotTotalAmount()
          refetchUserDepositAmount()
          refetchBalance()
        }}
      />
    </Wrapper>
  )
}

export default StakeCard
