import { AIBOT_ADDRESS, IEO_ADDRESS } from '@/constants/token'
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
import { forwardRef, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { parseEther } from 'viem'
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

  const [openBar1, setOpenBar1] = useState(false)

  const { address } = useAccount()

  const { data: balance } = useBalance({
    address,
    token: AIBOT_ADDRESS,
  })

  const {
    data: allowance,
    isError: allowanceError,
    isLoading: isFetchingAllowance,
    refetch: refetchAllowance,
  } = useContractRead({
    address: AIBOT_ADDRESS,
    abi: erc20ABI,
    functionName: 'allowance',
    enabled: !!address,
    args: [address || '0x', IEO_ADDRESS],
  })

  const isBalanceSufficient =
    balance && debouncedAmount && parseEther(debouncedAmount) <= balance.value
  const isAllowanceSufficient =
    allowance && debouncedAmount && parseEther(debouncedAmount) <= allowance

  console.log('>>>> allowance: ', allowance)

  const { config: depositConfig } = usePrepareContractWrite({
    address: IEO_ADDRESS,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ] as const,
    functionName: 'deposit',
    // enabled:
    //   !!debouncedAmount || !!isAllowanceSufficient || !!isBalanceSufficient,
    args: [parseEther(debouncedAmount)],
    // args: [parseEther('1')],
  })
  const {
    data: depositData,
    write: deposit,
    isLoading: isDepositing,
  } = useContractWrite(depositConfig)

  const { isSuccess: isDepositSuccess } = useWaitForTransaction({
    hash: depositData?.hash,
  })

  const { config: approveConfig, isLoading: isApproving } =
    usePrepareContractWrite({
      address: AIBOT_ADDRESS,
      abi: erc20ABI,
      functionName: 'approve',
      enabled: !!debouncedAmount,
      args: [IEO_ADDRESS, parseEther(debouncedAmount)],
    })
  const { data: approveData, writeAsync: approve } =
    useContractWrite(approveConfig)
  const { isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: approveData?.hash,
  })

  console.log('>>>> isApproveSuccess: ', isApproveSuccess)
  useEffect(() => {
    if (isApproveSuccess) {
      refetchAllowance()
      toast.success('Approve Successfully!')
      // setOpenBar1(true)
    }
  }, [isApproveSuccess])

  console.log('>> isDepositSuccess: ', isDepositSuccess)
  useEffect(() => {
    if (isDepositSuccess) {
      onDepositSuccess()
      refetchAllowance()
      toast.success('Deposit Successfully!', {
        toastId: 'deposit',
      })
    }
  }, [isDepositSuccess])

  const isLoading = isApproving || isDepositing
  // console.log(
  //   '> isAllowanceSufficient: ',
  //   isAllowanceSufficient,
  //   allowance,
  //   parseEther(amount),
  // )
  console.log(
    '> isBalanceSufficient: ',
    isBalanceSufficient,
    parseEther(debouncedAmount),
    balance?.value,
  )

  const getLabel = () => {
    if (!address) return 'Stake'

    if (typeof allowance !== 'bigint') return 'Failed to fetch allowance'

    if (isLoading) return <CircularProgress sx={{ color: '#FFF' }} size={36} />

    if (!isAllowanceSufficient) return 'Approve'

    if (!balance?.value) return 'Failed to fetch balance'

    if (!isBalanceSufficient) return 'Insufficient balance'

    return 'Stake'
  }

  const handleClick = async () => {
    if (typeof allowance !== 'bigint') return
    console.log('>> isAllowanceSufficient 00', isAllowanceSufficient)
    if (!isAllowanceSufficient) {
      const tx = await approve?.()
      const { data: _allowance } = await refetchAllowance()

      console.log('>>> _allowance: ', _allowance, parseEther(debouncedAmount))
      console.log(
        '>>> parseEther(debouncedAmount) <= _allowance: ',
        _allowance
          ? parseEther(debouncedAmount) <= _allowance
          : 'no _allowance',
      )

      if (_allowance && parseEther(debouncedAmount) <= _allowance) {
        deposit?.()
      }
    } else {
      deposit?.()
    }
  }

  const isDisabled =
    isLoading /* || !isBalanceSufficient || !isAllowanceSufficient */

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
          background:
            '#D8D8D8 linear-gradient(36deg, #25E3D5 0%, #64DAFF 100%)',
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
