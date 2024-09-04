import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import DefaultLayout from '../layouts/DefaultLayout';
import PrivateRoute from '../layouts/PrivateRoute';
import { CUSTOM_ROUTES } from '../constants/routes/routes';
import { LAYOUT_TYPES } from '../constants/layouts';
import { COMPANY_NAME } from '../constants/contacts';
import createEmotionCache from '../utils/createEmotionCache';
import { AuthContextProvider } from '../context/authContext';
import theme from '../styles/theme';

import '../styles/vars.css';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  router,
}: MyAppProps) => {
  const { pathname } = router;

  const customRoute = CUSTOM_ROUTES.find((route) => route?.path === pathname);

  const CustomLayout = () => {
    switch (customRoute?.layout) {
      case LAYOUT_TYPES.EMPTY:
        return <Component {...pageProps} />;
      default:
        return (
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        );
    }
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{`Marketplace | ${COMPANY_NAME}`}</title>
      </Head>

      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <PrivateRoute isPrivate={customRoute?.private}>
              <CustomLayout />
            </PrivateRoute>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </CacheProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
