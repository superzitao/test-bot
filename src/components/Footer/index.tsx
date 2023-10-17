import { Box, Typography } from '@mui/material'
import React from 'react'
import { FlexCol, RowCenterBetween } from '../common'
import Image from 'next/image'
import LinkGroup from './LinkGroup'
import SocialMediaGroup from './SocialMediaGroup'

const Footer = () => {
  return (
    <>
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.5)' }}>
        <RowCenterBetween sx={{ maxWidth: 1100, mx: 'auto', py: 70 }}>
          <FlexCol>
            <Image src="/logo-large.svg" alt="logo" width={234} height={64} />

            <Typography sx={{ fontSize: '16px', mt: 24 }}>
              AI-Powered Decentralized Exchange
            </Typography>
          </FlexCol>

          <LinkGroup />
        </RowCenterBetween>
      </Box>

      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <RowCenterBetween
          sx={{
            maxWidth: 1180,
            mx: 'auto',
            py: 22,
          }}
        >
          <Typography sx={{ zoom: 0.8 }}>
            ©2023 Aibot.com All rights reserved
          </Typography>

          <SocialMediaGroup />
        </RowCenterBetween>
      </Box>
    </>
  )
}

export default Footer
