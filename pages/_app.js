import Layout from '@/components/layout/layout'
import Notification from '@/components/ui/notification';
import { NotificationContextProvider } from '@/store/notification-context';
import '@/styles/globals.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Events</title>
          <meta
            name="description"
            content="Find a lot of events that allow you to evolve..."
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
