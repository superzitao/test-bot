import { IEO_ADDRESS } from '@/constants/token'
import { Typography } from '@mui/material'
import React from 'react'
import { formatEther } from 'viem'
import { useContractRead } from 'wagmi'

const TotalStatistics = ({ data }: { data: bigint | undefined }) => {
  console.log('data: ', data)

  return (
    <Typography
      sx={{
        fontSize: '25px',
        mt: 9,
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: 'inherit',
          color: '#39E0E2',
        }}
      >
        {data ? formatEther(data) : '-'}
      </Typography>
      &nbsp;/ 5,500,000,000
    </Typography>
  )
}

export default TotalStatistics
