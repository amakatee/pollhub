import '../styles/globals.scss'
import { AuthContext } from '../context/AuthContext'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return <Layout>
    <AuthContext>
    <Component {...pageProps} />
  </AuthContext> 
  </Layout> 
}

export default MyApp
