import type { AppProps } from 'next/app'
import '../styles/index.css'
import {
  AuthenticateProvider,
} from '../contexts/useAuthenticate';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <AuthenticateProvider><Component {...pageProps} /></AuthenticateProvider>
}
