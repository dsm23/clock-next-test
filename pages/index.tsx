import { useState } from 'react';

import styles from '../styles/Home.module.scss';
import Beers from '../components/beers';
import FormSearchCriteria from '../components/form';

export default function Home() {
  const [criteria, setCriteria] = useState<string>('');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Search Criteria</h1>
        <FormSearchCriteria criteria={criteria} liftState={setCriteria} />

        <h1>List of Beers</h1>
        <Beers criteria={criteria} />
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
}
