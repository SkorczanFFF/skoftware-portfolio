import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

function Document({ locale }: { locale: string }) {
  return (
    <Html lang={locale || 'pl'} className='scroll-smooth'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  // Provided by Next's i18n routing — derived from the URL prefix.
  return { ...initialProps, locale: ctx.locale ?? 'pl' };
};

export default Document;
