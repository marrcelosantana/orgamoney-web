import '.././styles/global.scss';
import { UserProvider } from '../contexts/UserContext';
function MyApp({ Component, pageProps }) {

  return(
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp