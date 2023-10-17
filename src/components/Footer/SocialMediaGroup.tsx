import React from 'react'
import { RowCenterBetween } from '../common'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const SocialMediaGroup = () => {
  return (
    <RowCenterBetween>
      <Link target="_blank" href="https://t.me/AIBotCapital">
        <IconButton>
          <Image src="/telegram.svg" alt="telegram" width={30} height={30} />
        </IconButton>
      </Link>

      <Link target="_blank" href="https://twitter.com/AIBotCapital">
        <IconButton>
          <Image src="/twitter.png" alt="twitter" width={30} height={30} />
        </IconButton>
      </Link>

      <Link
        target="_blank"
        href="https://www.youtube.com/channel/UCvVXWxbobEV-B_x9Zjuq93A"
      >
        <IconButton>
          <Image src="/youtube.png" alt="youtube" width={30} height={30} />
        </IconButton>
      </Link>
    </RowCenterBetween>
  )
}

export default SocialMediaGroup
