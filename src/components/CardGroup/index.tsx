import { Typography, styled } from '@mui/material'
import Image from 'next/image'
import { ColCenterX, RowCenter, RowCenterX } from '@/components/common'
import StakeCard from '@/components/CardGroup/StakeCard'
import CommitCard from '@/components/CardGroup/CommitCard'
import { usePaymentEndCountdown } from '@/hooks/ieo'

const Wrapper = styled(ColCenterX)`
  gap: 30px;
  padding-top: 50px;
  padding-bottom: 80px;

  background-image: url('/halo/cardgroup/halo1.png'),
    url('/halo/cardgroup/halo2.png'), url('/halo/cardgroup/halo3.png');
  background-position: left 0, 36% 80%, right 68px;
  background-repeat: no-repeat;
`

const CardGroup = () => {
  const {
    countdown: [paymentEndTimeCountDown],
    isValid,
  } = usePaymentEndCountdown()
  const isPaymentEnded = isValid && paymentEndTimeCountDown <= 0
  return (
    <Wrapper sx={{ pt: 50, pb: 80 }}>
      <RowCenterX sx={{ flexWrap: 'wrap', rowGap: 60, columnGap: 24 }}>
        <ColCenterX>
          <Image
            src="/stake.png"
            width={184}
            height={184}
            alt="stake"
            priority
          />

          <RowCenter
            sx={{
              color: '#39E0E2',
              borderRadius: '50%',
              border: '1px solid #39E0E2',
              width: 32,
              height: 32,
              mt: 19,
            }}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: 400 }}>
              1
            </Typography>
          </RowCenter>

          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '25px',
              fontWeight: 'bold',
              lineHeight: '30px',
              mt: 9,
            }}
          >
            Stake AIBOT
          </Typography>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: 400,

              width: 349,
              textAlign: 'center',
              opacity: 0.8,
              mt: 6,
            }}
          >
            The AIBOT you staked determines the amount of USDT you commit.
          </Typography>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: 400,

              opacity: 0.8,
              mt: 6,
              textAlign: 'center',
            }}
          >
            For every 10,000,000 AIBOT staked, you will get 100 USDT quota
          </Typography>

          <StakeCard />
        </ColCenterX>

        <ColCenterX sx={{ minWidth: { xs: 'unset', md: 544 } }}>
          <Image
            src="/commit.png"
            width={184}
            height={184}
            alt="commit"
            priority
          />
          <RowCenter
            sx={{
              color: '#39E0E2',
              borderRadius: '50%',
              border: '1px solid #39E0E2',
              width: 32,
              height: 32,
              mt: 19,
            }}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: 400 }}>
              2
            </Typography>
          </RowCenter>

          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '25px',
              fontWeight: 'bold',
              lineHeight: '30px',
              mt: 9,
            }}
          >
            Commit USDT
          </Typography>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: 400,

              width: 349,
              textAlign: 'center',
              opacity: 0.8,
              mt: 6,
            }}
          >
            You can commit your allocation.
          </Typography>

          <CommitCard />
        </ColCenterX>
      </RowCenterX>

      {isPaymentEnded && (
        <Typography sx={{ maxWidth: { xs: 320, md: 760 } }} variant="h6">
          Launchpad has ended, and the system is currently settling. The staked
          AIBOT, remaining USDT, and BRT on the BSC chain will be airdropped to
          the original address.
        </Typography>
      )}
    </Wrapper>
  )
}

export default CardGroup
