import { FunctionComponent, useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useDebounce } from 'react-use';

import styles from '../styles/Home.module.scss';
import Beers from '../components/beers';
import FormSearchCriteria from '../components/form';
import { Beer } from '../types';
import { fetcher } from '../utils';

const Home: FunctionComponent<InferGetStaticPropsType<
  typeof getStaticProps
>> = ({ initialData }) => {
  const [criteria, setCriteria] = useState<string>('');

  const [debouncedCriteria, setDebouncedVal] = useState<string>('');

  useDebounce(
    () => {
      setDebouncedVal(criteria);
    },
    300,
    [criteria],
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Clock Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Search Criteria</h1>
        <FormSearchCriteria criteria={criteria} liftState={setCriteria} />

        <h1>List of Beers</h1>
        <Beers criteria={debouncedCriteria} initialData={initialData} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const initialData: Beer[] = await fetcher('https://api.punkapi.com/v2/beers');
  return { props: { initialData } };
}
