// /* eslint-disable react/jsx-props-no-spreading */
// import NProgress from 'nprogress';
// import Router from 'next/router';
// import Page from '../components/Page';
// import '../components/styles/nprogress.css';

// Router.events.on('routeChangeStart', () => NProgress.start());
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

// // eslint-disable-next-line react/prop-types
// export default function MyApp({ Component, pageProps }) {
//   return (
//     <Page>
//       <Component {...pageProps} />
//     </Page>
//   );
// }

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  // Check if the individual page component (Component) has its own getInitialProps method
  if (Component.getInitialProps) {
    // If the page component has a getInitialProps method, call it with the ctx (context) object
    // This allows the individual page component to fetch its own data if needed
    pageProps = await Component.getInitialProps(ctx);
  }
  // Return an object containing the pageProps
  // These pageProps will be passed as props to the MyApp component
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
