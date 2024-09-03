import * as React from 'react';
import PropTypes from 'prop-types';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { AppProps as NextAppProps } from 'next/app';
import createEmotionServer from '@emotion/server/create-instance';
import { EmotionCache } from '@emotion/cache';

import createEmotionCache from '../utils/createEmotionCache';
import theme from '../styles/theme';

export interface MyDocumentProps {
  emotionStyleTags: React.ReactNode[];
}

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
}

export default function MyDocument(props: MyDocumentProps): React.ReactElement {
  const { emotionStyleTags } = props;

  return (
    <Html lang="es" dir="ltr">
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<any> => {
  const originalRenderPage: typeof ctx.renderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props: AppProps) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags: React.ReactNode[] = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

MyDocument.propTypes = {
  emotionStyleTags: PropTypes.array.isRequired,
};
