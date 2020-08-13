import { AppProps } from 'next/app';
import '../styles/globals.scss';

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
