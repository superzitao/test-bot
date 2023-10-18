import { useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import { RowCenterX } from '../common'

const Banner = () => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <RowCenterX sx={{ overflow: 'hidden' }}>
      {upMd ? (
        <Image
          src="/banner.png"
          width={1919}
          height={400}
          alt="banner"
          priority
        />
      ) : (
        <Image
          src="/banner.png"
          width={386}
          height={80}
          alt="banner"
          priority
        />
      )}
    </RowCenterX>
  )
}

export default Banner
