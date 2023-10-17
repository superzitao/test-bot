import { AIBOT_ADDRESS } from '@/constants/token'
import { Typography } from '@mui/material'
import React from 'react'
import { useAccount, useBalance, useContractRead } from 'wagmi'
import { FetchBalanceResult } from 'wagmi/actions'

const AvailableAmount = ({
  data,
}: {
  data: FetchBalanceResult | undefined
}) => {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: '16px',
        lineHeight: '16px',
      }}
    >
      Available: {data?.formatted} AIBOT
    </Typography>
  )
}

export default AvailableAmount
