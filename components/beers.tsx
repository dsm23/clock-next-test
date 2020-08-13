import { FunctionComponent, useMemo, useState } from 'react';
import useSWR from 'swr';
import clsx from 'clsx';

import styles from '../styles/Beers.module.scss';

import Loading from '../icons/loading';
import SortDown from '../icons/sortDown';
import SortUp from '../icons/sortUp';

import { fetcher } from '../utils';

import { Beer } from '../types';

interface Props {
  criteria: string;
  initialData: Beer[];
}

const API = 'https://api.punkapi.com/v2/beers';

const Beers: FunctionComponent<Props> = ({ criteria, initialData }) => {
  const [sortUp, setSort] = useState<boolean | undefined>(undefined);

  const url = `${API}${criteria ? `?beer_name=${criteria}` : ''}`;

  const { data, error } = useSWR<Beer[]>(url, fetcher, {
    // hack https://github.com/vercel/swr/issues/284
    initialData: url === API ? initialData : undefined,
  });

  const beers: Beer[] = useMemo(() => {
    if (data) {
      return sortUp === undefined
        ? data
        : (sortUp as boolean)
        ? data.sort((a, b) => b.abv - a.abv)
        : data.sort((a, b) => a.abv - b.abv);
    }
    return [];
  }, [sortUp, data]);

  if (error) return <div>failed to load</div>;
  if (!data) return <Loading className={styles.loading} />;

  const handleSortUp = () => setSort(true);

  const handleSortDown = () => setSort(false);

  return (
    <>
      <div>
        <button
          className={clsx([styles.sort, sortUp && styles.active])}
          onClick={handleSortUp}
        >
          <SortUp />
        </button>
        <button
          className={clsx([styles.sort, sortUp === false && styles.active])}
          onClick={handleSortDown}
        >
          <SortDown />
        </button>
      </div>

      {beers.map(beer => (
        <div className={styles.card} key={`${beer.name}-beerCard`}>
          <div className={styles.textSection}>
            <div className={styles.details}>
              <div className={styles.titles}>name:</div>
              <div className={styles.data}>{beer.name}</div>
            </div>
            <div className={styles.details}>
              <div className={styles.titles}>tagline:</div>
              <div className={styles.data}>{beer.tagline}</div>
            </div>
            <div className={styles.details}>
              <div className={styles.titles}>description:</div>
              <div className={styles.data}>{beer.description}</div>
            </div>
            <div className={styles.details}>
              <div className={styles.titles}>abv:</div>
              <div className={clsx([styles.data, styles.bold])}>{beer.abv}</div>
            </div>
          </div>
          <img className={styles.image} src={beer.image_url ?? ''} alt="beer" />
        </div>
      ))}
    </>
  );
};

export default Beers;
