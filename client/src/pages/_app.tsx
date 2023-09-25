import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import { Domine, Public_Sans } from 'next/font/google';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { NextPage } from 'next';
import { RecoilRoot } from 'recoil';

import { GAPage } from '@/lib/analytics/ga';

import NProgress from '@/components/ui/nprogress';
import { TooltipProvider } from '@/components/ui/tooltip';

import Layout from '@/layouts';

const publicSans = Public_Sans({
  weight: ['300', '400', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'block',
});

const domine = Domine({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-domine',
  display: 'block',
});

import '@/styles/globals.css';
import '@/styles/mapbox.css';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  const router = useRouter();
  const { asPath } = router;

  const [routeLoading, setRouteLoading] = useState({
    loading: false,
    key: 0,
  });

  // Never ever instantiate the client outside a component, hook or callback as it can leak data
  // between users
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            structuralSharing: false,
          },
        },
      })
  );

  const handleRouteChangeStart = useCallback(
    (path: string) => {
      const prevPath = asPath.split('?')[0];
      const nextPath = path.split('?')[0];

      // Prevent the route loading indicator from flashing when navigating to the same page.
      if (prevPath === nextPath) return;

      setRouteLoading((prevState) => ({
        ...prevState,
        loading: true,
        key: prevState.key + 1,
      }));
    },
    [asPath]
  );

  const handleRouteChangeCompleted = useCallback(
    (path: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) GAPage(path);

      setRouteLoading((prevState) => ({
        ...prevState,
        loading: false,
      }));
    },
    []
  );

  const handleRouteChangeError = useCallback(() => {
    setRouteLoading((prevState) => ({
      ...prevState,
      loading: false,
    }));
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeCompleted);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeCompleted);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events, handleRouteChangeStart, handleRouteChangeCompleted, handleRouteChangeError]);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-public-sans: ${publicSans.style.fontFamily};
          --font-domine: ${domine.style.fontFamily};
        }
      `}</style>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <TooltipProvider delayDuration={750}>
              <NProgress {...routeLoading} />
              {/* Layout */}
              {getLayout(<Component {...pageProps} />)}
            </TooltipProvider>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
