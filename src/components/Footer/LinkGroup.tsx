import { Typography, styled } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { FlexCol, FlexRow, RowCenter, RowCenterY } from '../common'

const TextTitle = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
`

const StyledLink = styled(Link)`
  font-size: 14px;
  font-weight: 400;
  color: #cbc7d6;
  line-height: 17px;
  text-decoration-line: none;
`

const DisabledLink = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  color: #cbc7d6;
  line-height: 17px;
  cursor: pointer;
`

const LinkGroup = () => {
  return (
    <FlexRow sx={{ gap: 73 }}>
      <FlexCol sx={{ gap: 10 }}>
        <TextTitle>Links</TextTitle>

        <StyledLink href="https://t.me/Aibotcapital_bot" target="_blank">
          Telegram Bot
        </StyledLink>

        <StyledLink href="https://t.me/Aibotcapital_bot" target="_blank">
          Scanner Channel
        </StyledLink>

        <DisabledLink onClick={() => alert('Coming soon')}>
          Buy $AIBOT
        </DisabledLink>
      </FlexCol>

      <FlexCol sx={{ gap: 10 }}>
        <TextTitle>Socials</TextTitle>

        <StyledLink href="https://twitter.com/AIBotCapital" target="_blank">
          Twitter
        </StyledLink>

        <StyledLink href="https://t.me/AIBotCapital" target="_blank">
          Telegram Group
        </StyledLink>

        <StyledLink href="mailto:business@AIBot.capital">Contact Us</StyledLink>
      </FlexCol>

      <FlexCol sx={{ gap: 10 }}>
        <TextTitle>Resources</TextTitle>

        <StyledLink href="https://aibot.gitbook.io/aibot-tutorial-series/">
          Docs
        </StyledLink>

        <DisabledLink onClick={() => alert('Coming soon')}>
          Token Chart
        </DisabledLink>
      </FlexCol>

      <FlexCol sx={{ gap: 10 }}>
        <TextTitle>Legals</TextTitle>
        <StyledLink href="/">Terms & Conditions</StyledLink>
      </FlexCol>
    </FlexRow>
  )
}

export default LinkGroup
