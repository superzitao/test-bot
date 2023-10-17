import Image from 'next/image'
import { RowCenterBetween } from '@/components/common'

const Header = () => {
  return (
    <RowCenterBetween sx={{ height: 60 }}>
      <Image src="/logo.svg" alt="AIbot" width={118} height={32} priority />

      <w3m-button />
    </RowCenterBetween>
  )
}

export default Header
