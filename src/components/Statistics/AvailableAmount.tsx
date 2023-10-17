import { AIBOT_ADDRESS } from '@/constants/token'
import { formatNumber } from '@/utils/number'
import { Typography } from '@mui/material'
import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import React from 'react'
import { useAccount, useBalance, useContractRead } from 'wagmi'
import { FetchBalanceResult } from 'wagmi/actions'

const AvailableAmount = ({ data }: { data: BigNumber | undefined }) => {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: '16px',
        lineHeight: '16px',
      }}
    >
      Available: {data ? formatNumber(data) : '-'} AIBOT
    </Typography>
  )
}

export default AvailableAmount
