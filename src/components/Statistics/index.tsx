import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { ColCenterX, FlexCol, RowCenterY } from '../common'
import Image from 'next/image'

const Wrapper = styled(ColCenterX)`
  padding-top: 100px;
  padding-bottom: 100px;

  background-color: #28223d;
  background-image: url('/halo/statistics/halo1.png'),
    url('/halo/statistics/halo2.png');
  background-position: left bottom, right bottom;
  background-repeat: no-repeat;
`

const TextTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  opacity: 0.8;
  backdrop-filter: blur(10px);
`
const TextValue = styled(Typography)`
  font-size: 34px;
  font-weight: bold;
  line-height: 34px;
`

const Statistics = () => {
  return (
    <Wrapper>
      <Box sx={{ position: 'relative' }}>
        <Typography sx={{ fontSize: '38px', fontWeight: 'bold' }}>
          Battle Royale Game Tokenomics
        </Typography>
        <Box
          sx={{
            width: 171,
            height: 10,
            bgcolor: '#39E0E2',
            opacity: 0.8,
            position: 'absolute',
            bottom: 8,
            left: 'calc(50% - 85px)',
          }}
        />
      </Box>

      <RowCenterY sx={{ gap: 54, mt: 70 }}>
        <FlexCol sx={{ gap: 32 }}>
          <FlexCol sx={{ gap: 10 }}>
            <TextTitle>Token Name:</TextTitle>
            <TextValue>BRT</TextValue>
          </FlexCol>

          <FlexCol sx={{ gap: 10 }}>
            <TextTitle>Total Amount:</TextTitle>
            <TextValue sx={{ color: '#39E0E2' }}>1,000,000,000</TextValue>
          </FlexCol>

          <FlexCol sx={{ gap: 10 }}>
            <TextTitle>Public Chain:</TextTitle>
            <TextValue>BNB Chain</TextValue>
          </FlexCol>
        </FlexCol>

        <Image src="/chart.png" width={432} height={347} alt="tokenomics" />
      </RowCenterY>
    </Wrapper>
  )
}

export default Statistics
