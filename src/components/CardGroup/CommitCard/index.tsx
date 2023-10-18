import { RowCenterBetween, RowCenterY } from '@/components/common'
import { IEO_ADDRESS, USDT_ADDRESS } from '@/constants/token'
import { useAllowance, useApprove, useBalanceOf } from '@/hooks/erc20'
import { useCommitUsdt } from '@/hooks/ieo'
import { useDebounce } from '@/hooks/useDebounce'
import { formatNumber } from '@/utils/number'
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  OutlinedInput,
  Typography,
  styled,
} from '@mui/material'
import { parseUnits } from 'ethers/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'

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

  // const { data: balance } = useBalance({
  //   address,
  //   token: USDT_ADDRESS,
  // })

  const { data: usdtBalance, refresh: refreshUsdtBalance } = useBalanceOf({
    tokenAddress: USDT_ADDRESS,
    ownerAddress: address,
  })

  const {
    data: usdtAllowance,
    runAsync: getUsdtAllowance,
    refresh: refreshUsdtAllowance,
  } = useAllowance(USDT_ADDRESS, IEO_ADDRESS)

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
    usdtBalance &&
    debouncedAmount &&
    parseUnits(debouncedAmount, 6).lte(usdtBalance)

  const isAllowanceSufficient =
    usdtAllowance &&
    debouncedAmount &&
    parseUnits(debouncedAmount, 6).lte(usdtAllowance)

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

  const { runAsync: approve, loading: isApproving } = useApprove(USDT_ADDRESS, {
    onSuccess: () => {
      refreshUsdtAllowance()
      toast.success('Approve Successfully!')
    },
  })

  const { run: commitUsdt, loading: isCommitingUsdt } = useCommitUsdt({
    onSuccess: () => {
      refreshUsdtAllowance()
      refetchAllocation()
      refetchUserCommited()
      toast.success('Commit Successfully!', {
        toastId: 'commit',
      })
    },
  })

  const isLoading = isApproving || isCommitingUsdt

  const getLabel = () => {
    if (!amount) return 'Commit'

    if (isLoading) return <CircularProgress sx={{ color: '#FFF' }} size={36} />

    if (!isBalanceSufficient) return 'Insufficient balance'

    return 'Commit'
  }

  const handleClick = async () => {
    console.log('in click')
    if (!usdtAllowance) return

    if (!isAllowanceSufficient) {
      await approve(IEO_ADDRESS, parseUnits(debouncedAmount, 6))
      const _allowance = await getUsdtAllowance()

      if (_allowance && parseUnits(debouncedAmount, 6).lte(_allowance)) {
        commitUsdt({ amount: parseUnits(debouncedAmount, 6) })
      }
    } else {
      commitUsdt({ amount: parseUnits(debouncedAmount, 6) })
    }
  }

  const isDisabled = isLoading || !debouncedAmount || !isBalanceSufficient

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
          {allocation !== undefined ? formatNumber(allocation, 6) : '-'}
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
          {userCommited !== undefined ? formatNumber(userCommited, 6) : '-'}
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
          Available: {usdtBalance ? formatNumber(usdtBalance, 6) : '-'} USDT
        </Typography>

        <Link
          target="_blank"
          href="https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0xdAC17F958D2ee523a2206206994597C13D831ec7&chain=mainnet"
          style={{ textDecorationLine: 'none', color: 'unset' }}
        >
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
