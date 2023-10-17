import { formatNumber } from '@/utils/number'
import { Typography } from '@mui/material'
import { BigNumber } from 'ethers'

const UserStakedAmount = ({ data }: { data: BigNumber | undefined }) => {
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
          {data !== undefined ? formatNumber(data) : '-'}
        </Typography>
        &nbsp;AIBOT
      </Typography>
    </>
  )
}

export default UserStakedAmount
