import { AIBOT_ADDRESS, IEO_ADDRESS } from '@/constants/token'
import { useAllowance, useApprove, useBalanceOf } from '@/hooks/erc20'
import {
  useDepositAibot,
  useDepositEndCountdown,
  useStartTimeCountDown,
} from '@/hooks/ieo'
import { Button, CircularProgress, OutlinedInput } from '@mui/material'
import { parseEther } from 'ethers/lib/utils'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { useAccount } from 'wagmi'

const StakeButton = ({
  onDepositSuccess,
}: {
  onDepositSuccess: () => void
}) => {
  const [amount, setAmount] = useState('')

  const { address } = useAccount()

  const { data: aibotBalance, refresh: refreshAibotBalance } = useBalanceOf({
    tokenAddress: AIBOT_ADDRESS,
    ownerAddress: address,
  })

  const {
    data: aibotAllowance,
    runAsync: getAibotAllowance,
    refresh: refreshAibotAllowance,
  } = useAllowance(AIBOT_ADDRESS, IEO_ADDRESS)

  const isBalanceSufficient =
    aibotBalance && amount && parseEther(amount).lte(aibotBalance)

  const isAllowanceSufficient =
    aibotAllowance && amount && parseEther(amount).lte(aibotAllowance)

  console.log('>>>> allowance: ', aibotAllowance?.toString())

  const [startTimeCountDown, formattedRes] = useStartTimeCountDown()
  const {
    countdown: [depositEndCountdown],
    isValid,
  } = useDepositEndCountdown()

  const { run: depositAibot, loading: isDepositingAibot } = useDepositAibot({
    onSuccess: () => {
      onDepositSuccess()
      refreshAibotAllowance()
      refreshAibotBalance()
      toast.success('Deposit Successfully!', {
        toastId: 'deposit',
      })
    },
  })

  const { runAsync: approve, loading: isApproving } = useApprove(
    AIBOT_ADDRESS,
    {
      onSuccess: () => {
        refreshAibotAllowance()
        toast.success('Approve Successfully!')
      },
    },
  )

  const isDepositEnded = isValid && depositEndCountdown <= 0
  const isLoading = isApproving || isDepositingAibot

  const { days, hours, minutes, seconds } = formattedRes

  const getLabel = () => {
    if (isLoading) return <CircularProgress sx={{ color: '#FFF' }} size={36} />

    if (startTimeCountDown > 0)
      return `Start in ${days} d ${hours} h ${minutes} m ${seconds} s`

    if (isDepositEnded) return 'Ended'

    if (!amount) return 'Stake'

    if (!isBalanceSufficient) return 'Insufficient balance'

    return 'Stake'
  }

  const handleClick = async () => {
    if (!aibotAllowance) return

    if (!isAllowanceSufficient) {
      const tx = await approve(IEO_ADDRESS, parseEther(amount))
      const _allowance = await getAibotAllowance()

      if (_allowance && parseEther(amount).lte(_allowance)) {
        depositAibot({
          amount: parseEther(amount),
        })
      }
    } else {
      depositAibot({
        amount: parseEther(amount),
      })
    }
  }

  const isDisabled =
    isLoading ||
    !amount ||
    !isBalanceSufficient ||
    startTimeCountDown > 0 ||
    isDepositEnded

  return (
    <>
      <OutlinedInput
        sx={{ mt: 10, borderRadius: '16px', height: 61 }}
        placeholder="Stake Amount"
        endAdornment="AIBOT"
        onChange={(ev) => {
          setAmount(ev.target.value)
        }}
      />

      <Button
        variant="contained"
        sx={{
          mt: 10,
          height: 61,
          borderRadius: '16px',
          // background:
          //   '#D8D8D8 linear-gradient(36deg, #25E3D5 0%, #64DAFF 100%)',
          fontSize: '25px',
          color: '#FFFFFF',
          '&:hover': {
            opacity: 0.9,
          },
        }}
        disabled={isDisabled}
        onClick={handleClick}
      >
        {getLabel()}
      </Button>
    </>
  )
}

export default StakeButton
