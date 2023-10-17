import { Box } from '@mui/material'
import Image from 'next/image'
import { RowCenterX } from '../common'

const Banner = () => {
  return (
    <RowCenterX sx={{ overflow: 'hidden' }}>
      <Image
        src="/banner.png"
        width={1919}
        height={400}
        alt="banner"
        priority
      />
    </RowCenterX>
  )
}

export default Banner
