import type { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'
import { HomePage } from '../components/modules/HomePage'
import { withSSRGuest } from '../utils/withSSRGuest'

const Home: NextPage = () => {
  return (
    <HomePage />
  )
}

export default Home

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
