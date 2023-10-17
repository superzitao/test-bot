import { AIBOT_ADDRESS, IEO_ADDRESS } from '@/constants/token'
import { useAllowance, useApprove, useBalanceOf } from '@/hooks/erc20'
import { useDepositAibot } from '@/hooks/ieo'
import { useDebounce } from '@/hooks/useDebounce'
import {
  Alert as MuiAlert,
  Button,
  CircularProgress,
  Snackbar,
  useTheme,
  AlertProps,
  OutlinedInput,
} from '@mui/material'
import { parseEther } from 'ethers/lib/utils'
import { forwardRef, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { readContract } from 'wagmi/actions'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const StakeButton = ({
  onDepositSuccess,
}: {
  onDepositSuccess: () => void
}) => {
  const [amount, setAmount] = useState('')
  const debouncedAmount = useDebounce(amount, 500)

  const { address } = useAccount()

  // const { data: balance } = useBalance({
  //   address,
  //   token: AIBOT_ADDRESS,
  // })
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
    aibotBalance &&
    debouncedAmount &&
    parseEther(debouncedAmount).lte(aibotBalance)

  const isAllowanceSufficient =
    aibotAllowance &&
    debouncedAmount &&
    parseEther(debouncedAmount).lte(aibotAllowance)

  console.log('>>>> allowance: ', aibotAllowance?.toString())

  const { run: depositAibot, loading: isDepositingAibot } = useDepositAibot({
    onSuccess: () => {
      onDepositSuccess()
      refreshAibotAllowance()
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

  const isLoading = isApproving || isDepositingAibot
  // console.log(
  //   '> isAllowanceSufficient: ',
  //   isAllowanceSufficient,
  //   allowance,
  //   parseEther(amount),
  // )
  console.log(
    '> isBalanceSufficient: ',
    isBalanceSufficient,
    debouncedAmount ? parseEther(debouncedAmount).toString() : 'null',
    aibotBalance?.toString(),
  )

  const getLabel = () => {
    if (!amount) return 'Stake'

    if (isLoading) return <CircularProgress sx={{ color: '#FFF' }} size={36} />

    if (!isBalanceSufficient) return 'Insufficient balance'

    return 'Stake'
  }

  const handleClick = async () => {
    if (!aibotAllowance) return

    if (!isAllowanceSufficient) {
      const tx = await approve(IEO_ADDRESS, parseEther(amount))
      const _allowance = await getAibotAllowance()

      // console.log('>>> _allowance: ', _allowance, parseEther(debouncedAmount))
      // console.log(
      //   '>>> parseEther(debouncedAmount) <= _allowance: ',
      //   _allowance
      //     ? parseEther(debouncedAmount) <= _allowance
      //     : 'no _allowance',
      // )

      if (_allowance && parseEther(debouncedAmount).lte(_allowance)) {
        depositAibot({
          amount: parseEther(debouncedAmount),
        })
      }
    } else {
      depositAibot({
        amount: parseEther(debouncedAmount),
      })
    }
  }

  const isDisabled =
    isLoading ||
    !debouncedAmount ||
    !isBalanceSufficient /* || !isBalanceSufficient || !isAllowanceSufficient */

  // useEffect(() => {
  //   refetchAllowance()
  // }, [debouncedAmount, refetchAllowance])

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

      {/* <Snackbar
        open={isApproveSuccess}
        autoHideDuration={2000}
        onClose={() => setOpenBar1(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Approve Successfully!
        </Alert>
      </Snackbar> */}
      {/*<Snackbar
        open={isDepositSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Deposit Successfully!
        </Alert>
      </Snackbar> */}
    </>
  )
}

export default StakeButton
