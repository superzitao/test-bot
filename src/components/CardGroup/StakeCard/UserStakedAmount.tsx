import { IEO_ADDRESS } from '@/constants/token'
import { Typography } from '@mui/material'
import React from 'react'
import { formatEther } from 'viem'
import { useAccount, useContractRead } from 'wagmi'

const UserStakedAmount = ({ data }: { data: bigint | undefined }) => {
  return (
    <>
      <Typography
        component="span"
        sx={{
          fontSize: '25px',

          mt: 30,
        }}
      >
        AIBOT Staked
      </Typography>

      <Typography
        sx={{
          fontSize: '40px',
          lineHeight: '40px',
          mt: 8,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: 'inherit',
            lineHeight: 'inherit',
            color: '#39E0E2',
          }}
        >
          {data ? formatEther(data) : '-'}
        </Typography>
        &nbsp;AIBOT
      </Typography>
    </>
  )
}

export default UserStakedAmount
