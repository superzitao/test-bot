import { formatNumber } from '@/utils/number'
import { Typography } from '@mui/material'
import { BigNumber } from 'ethers'
import React from 'react'

const TotalStatistics = ({ data }: { data: BigNumber | undefined }) => {
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
        {data !== undefined ? formatNumber(data) : '-'}
      </Typography>
      &nbsp;/ 5,500,000,000
    </Typography>
  )
}

export default TotalStatistics
