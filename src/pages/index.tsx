import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { SpecificPeriod } from '../components/home/specific-period';
import { gtm } from '../lib/gtm';

const Home: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Asteroid App
        </title>
      </Head>
      <main>
        <SpecificPeriod />
      </main>
    </>
  );
};

export default Home;
