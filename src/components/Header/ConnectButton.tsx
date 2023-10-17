import { ButtonBase, styled } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const ConnectButtonBase = styled(ButtonBase)`
  width: 158;
  height: 40;
  border: 1px solid #39e0e2;
  color: #39e0e2;
  padding: 6px;
  border-radius: 8px;
  font-size: 16px;
  gap: 4px;
`

const ConnectButton = () => {
  return (
    <ConnectButtonBase>
      <Image
        src="/wallet.svg"
        priority
        width={28}
        height={28}
        alt="wallet icon"
      />
      Connect Wallet
    </ConnectButtonBase>
  )
}

export default ConnectButton
