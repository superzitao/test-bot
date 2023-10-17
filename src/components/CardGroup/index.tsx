import { Typography, styled } from '@mui/material'
import Image from 'next/image'
import { ColCenterX, RowCenter, RowCenterX } from '@/components/common'
import StakeCard from '@/components/CardGroup/StakeCard'
import CommitCard from '@/components/CardGroup/CommitCard'

const Wrapper = styled(RowCenterX)`
  gap: 110px;
  padding-top: 50px;
  padding-bottom: 80px;

  background-image: url('/halo/cardgroup/halo1.png'),
    url('/halo/cardgroup/halo2.png'), url('/halo/cardgroup/halo3.png');
  background-position: left 0, 36% 80%, right 68px;
  background-repeat: no-repeat;
`

const CardGroup = () => {
  return (
    <Wrapper sx={{ pt: 50, gap: 24, pb: 80 }}>
      <ColCenterX>
        <Image src="/stake.png" width={184} height={184} alt="stake" priority />

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
          <Typography sx={{ fontSize: '20px', fontWeight: 400 }}>1</Typography>
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
          }}
        >
          For every 10,000,000 AIBOT staked, you will get 100 USDT quota
        </Typography>

        <StakeCard />
      </ColCenterX>

      <ColCenterX sx={{ minWidth: 544 }}>
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
          <Typography sx={{ fontSize: '20px', fontWeight: 400 }}>2</Typography>
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
    </Wrapper>
  )
}

export default CardGroup
