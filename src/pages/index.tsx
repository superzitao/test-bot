import { Container } from '@mui/material'
import Header from '@/components/Header'
import Statistics from '@/components/Statistics'
import Footer from '@/components/Footer'
import CardGroup from '@/components/CardGroup'
import Banner from '@/components/Banner'
import { useEffect, useState } from 'react'

const IeoPage = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div style={{ backgroundColor: '#211C32' }}>
      <Container maxWidth="xl">
        <Header />
        <Banner />
      </Container>

      <CardGroup />

      <Statistics />

      <Footer />
    </div>
  )
}

export default IeoPage
function setIsMounted(arg0: boolean) {
  throw new Error('Function not implemented.')
}
