import { RowCenterBetween, RowCenterY } from '@/components/common'
import { IEO_ADDRESS, USDT_ADDRESS } from '@/constants/token'
import { useDebounce } from '@/hooks/useDebounce'
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  OutlinedInput,
  Typography,
  styled,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { formatEther, formatUnits, parseEther, parseUnits } from 'viem'
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

const Wrapper = styled(Box)`
  margin-top: 86px;

  background: #211c32;
  padding: 24px;
  width: 428px;
  border: 1px solid rgba(256, 256, 256, 0.44);
  border-radius: 21px;

  display: flex;
  flex-direction: column;
`

const CommitCard = () => {
  const [amount, setAmount] = useState('')
  const debouncedAmount = useDebounce(amount, 500)

  const { address } = useAccount()

  const { data: balance } = useBalance({
    address,
    token: USDT_ADDRESS,
  })

  const {
    data: allowance,
    isError: allowanceError,
    isLoading: isFetchingAllowance,
    refetch: refetchAllowance,
  } = useContractRead({
    address: USDT_ADDRESS,
    abi: erc20ABI,
    functionName: 'allowance',
    enabled: !!address,
    args: [address || '0x', IEO_ADDRESS],
  })

  const { data: userCommited, refetch: refetchUserCommited } = useContractRead({
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
        name: 'payments',
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
    functionName: 'payments',
    enabled: !!address,
    args: [address || '0x'],
  })

  const isBalanceSufficient =
    balance &&
    debouncedAmount &&
    parseUnits(debouncedAmount, 6) <= balance.value
  const isAllowanceSufficient =
    allowance && debouncedAmount && parseUnits(debouncedAmount, 6) <= allowance

  const { data: allocation, refetch: refetchAllocation } = useContractRead({
    address: IEO_ADDRESS,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'getPurchaseAmount',
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
    functionName: 'getPurchaseAmount',
    enabled: !!address,
    args: [address || '0x'],
  })

  const { config: approveConfig, isLoading: isApproving } =
    usePrepareContractWrite({
      address: USDT_ADDRESS,
      abi: erc20ABI,
      functionName: 'approve',
      enabled: !!debouncedAmount,
      args: [IEO_ADDRESS, parseUnits(debouncedAmount, 6)],
    })
  const { data: approveData, writeAsync: approve } =
    useContractWrite(approveConfig)
  const { isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: approveData?.hash,
  })

  const { config: commitConfig } = usePrepareContractWrite({
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
        name: 'purchase',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ] as const,
    functionName: 'purchase',
    enabled:
      !!debouncedAmount || !!isAllowanceSufficient || !!isBalanceSufficient,
    args: [parseUnits(debouncedAmount, 6)],
    // args: [parseEther('1')],
  })
  const {
    data: commitData,
    write: commit,
    isLoading: isCommiting,
  } = useContractWrite(commitConfig)

  const { isSuccess: isCommitSuccess } = useWaitForTransaction({
    hash: commitData?.hash,
  })

  const isLoading = isApproving || isCommiting

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

    if (!isAllowanceSufficient) {
      const tx = await approve?.()
      const { data: _allowance } = await refetchAllowance()

      console.log(
        '>>> _allowance: ',
        _allowance,
        parseUnits(debouncedAmount, 6),
      )
      console.log(
        '>>> parseUnits(debouncedAmount, 6) <= _allowance: ',
        _allowance
          ? parseUnits(debouncedAmount, 6) <= _allowance
          : 'no _allowance',
      )

      if (_allowance && parseUnits(debouncedAmount, 6) <= _allowance) {
        commit?.()
      }
    } else {
      commit?.()
    }
  }

  useEffect(() => {
    if (isApproveSuccess) {
      refetchAllowance()
      toast.success('Approve Successfully!')
      // setOpenBar1(true)
    }
  }, [isApproveSuccess])

  console.log('>> isDepositSuccess: ', isCommitSuccess)
  useEffect(() => {
    if (isCommitSuccess) {
      refetchAllowance()
      refetchAllocation()
      refetchUserCommited()
      toast.success('Commit Successfully!', {
        toastId: 'commit',
      })
    }
  }, [isCommitSuccess])

  const isDisabled = isLoading

  const percentage =
    allocation && userCommited
      ? Number((userCommited * BigInt(100)) / (allocation + userCommited))
      : 0

  return (
    <Wrapper>
      <RowCenterY sx={{ gap: 8 }}>
        <Image src="/usdt.png" width={26} height={26} alt="usdt" priority />
        <Typography
          sx={{
            fontSize: '25px',
            fontWeight: 'bold',
          }}
        >
          USDT
        </Typography>
      </RowCenterY>

      <Typography
        component="span"
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',

          ml: 'auto',
          color: '#39E285',
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
            bgcolor: '#39E285',
            borderRadius: '10px',
          },
        }}
        variant="determinate"
        value={percentage}
      />

      <Typography
        sx={{
          fontSize: '25px',
          mt: 9,
        }}
      >
        Your allocation:&nbsp;
        <Typography
          component="span"
          sx={{
            fontSize: 'inherit',
            color: '#39E285',
          }}
        >
          {allocation !== undefined
            ? Number(formatUnits(allocation, 6)).toFixed()
            : '-'}
        </Typography>
      </Typography>

      <Typography
        component="span"
        sx={{
          fontSize: '25px',

          mt: 30,
        }}
      >
        USDT Commited
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
            color: '#39E285',
          }}
        >
          {userCommited !== undefined ? formatUnits(userCommited, 6) : '-'}
        </Typography>
        &nbsp;USDT
      </Typography>

      <RowCenterBetween sx={{ mt: 30 }}>
        <Typography
          component="span"
          sx={{
            fontSize: '16px',
            lineHeight: '16px',
          }}
        >
          Available: {balance !== undefined ? balance.formatted : '-'} USDT
        </Typography>

        <Link href="/" style={{ textDecorationLine: 'none', color: 'unset' }}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#39E285',
              borderBottom: '1px solid',
            }}
          >
            Buy USDT
          </Typography>
        </Link>
      </RowCenterBetween>

      <OutlinedInput
        color="secondary"
        sx={{ mt: 10, borderRadius: '16px', height: 61 }}
        placeholder="Commit Amount"
        endAdornment="USDT"
        onChange={(ev) => {
          setAmount(ev.target.value)
        }}
      />

      <Button
        variant="contained"
        color="secondary"
        disabled={isDisabled}
        sx={{
          mt: 10,
          height: 61,
          borderRadius: '16px',
          fontSize: '25px',
          color: '#FFFFFF',
        }}
        onClick={handleClick}
      >
        {getLabel()}
      </Button>
    </Wrapper>
  )
}

export default CommitCard
