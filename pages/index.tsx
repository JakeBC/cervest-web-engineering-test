import { useState } from 'react';
import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import RainfallTable from '@/components/table'
import SelectList from '@/components/select';
import useRainfallData from '@/hooks/useRainfallData';

const Home = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const handleRegionChange = (value: string) => setSelectedRegion(value);

  const {table, regions, totalRainfall, averageRainfall, consecutiveDaysOver10mm} = useRainfallData(selectedRegion);
  const [tableHeader, ...tableRows] = table;
  const summaryHeader = [
    'Total rainfall',
    'Average rainfall',
    'Number of consecutive days where rainfall exceeds 10mm',
  ];
  const summaryRows = [
    [totalRainfall, averageRainfall, consecutiveDaysOver10mm],
  ];

  return (
    <>
      <Head>
        <title>Cervest rainfall data</title>
        <meta name="description" content="Cervest web engineering test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SelectList value={selectedRegion} options={regions} label="Region" handleChange={handleRegionChange} />
        <RainfallTable header={tableHeader} rows={tableRows} />
        <RainfallTable header={summaryHeader} rows={summaryRows} name="rainfall summary table" />
      </main>
    </>
  );
};

export default Home;
