import { useMemo } from 'react';
import useSWR, { Fetcher } from 'swr';
import { RainfallData, RainfallTableData } from '../types/rainfall';

/**
 * Fetcher function for use with swr
 * @param url 
 * @returns a promise which will resolve response json body
 */
const fetcher: Fetcher<any> = (url: string) => fetch(url).then(res => res.json());

/**
 * Find the maximum consecutive days where rainfall exceeded 10mm
 * @param dailyRainfallTotals 
 * @returns a number representing the longest consecutive days where rainfall exceeded 10mm
 */
const calculateMaxConsecutiveDays = (dailyRainfallTotals: number[]) => {
  let currentCount = 0;

  const testFunction = (value: number) => {
    currentCount = value > 10 ? currentCount + 1 : 0;
    return value > 10 ? currentCount : 0;
  }

  const consecutiveDays = dailyRainfallTotals.map(testFunction);

  return Math.max(...consecutiveDays);
};

/**
 * Transforms api rainfall data to a format suitable for parsing when populating an html table
 * @param rainfall 
 * @param regionFilter
 * @returns rainfall data for table display along with rainfall summary data
 */
export const prepareTableData = (rainfall: RainfallData = [], regionFilter?: string): RainfallTableData => {
  const dates = rainfall.map((item) => new Date(item.date).toLocaleDateString());
  const tableHeader = ['Region', ...dates];
  const table = [tableHeader];
  const regions: string[] = [];
  const dailyRainfallTotals: number[] = [];
  let totalRainfall = 0;
  let count = 0;

  const tableData = rainfall.reduce((col, item, columnIndex) => {
    let dailyTotalRainfall = 0;

    item.data.forEach(({ regionName, value }) => {
      // collect a list of all of the represented regions
      if (columnIndex === 0) {
        regions.push(regionName);
      }

      // do not continue where a region filter is provided and the current
      // region does not match that filter
      if (regionFilter && regionFilter !== regionName) {
        return;
      }

      // for the first column init a new array which will hold rainfall data as a table row
      // the first cell in the row will be the region name
      if (columnIndex === 0) {
        col.push([regionName]);
      }

      // push rainfall values into each table region row
      const regionRow = col.find((row) => row.includes(regionName));
      regionRow?.push(value.toString());
      
      // increment the total rainfall value
      totalRainfall += value;

      // increment the daily rainfall value
      dailyTotalRainfall += value;

      // count the number of rainfall values
      count += 1;
    });

    // persist an array of daily total rainfall in order to look for trends
    dailyRainfallTotals.push(dailyTotalRainfall);

    return col;
  }, table);

  return {
    table,
    regions,
    totalRainfall,
    averageRainfall: Math.round(totalRainfall / count) || 0,
    consecutiveDaysOver10mm: calculateMaxConsecutiveDays(dailyRainfallTotals),
  };
};

/**
 * Fetches rainfall data and returns that in a format suitable for tabular display.
 * Dates in columns, regions in rows.
 * @param regionFilter
 * @returns the data required to populate the rainfall data table and summary information
 */
const useRainfallData = (regionFilter?: string) => {
  const { data } = useSWR<RainfallData>('/api/rainfall', fetcher);

  const tableData = useMemo(() => prepareTableData(data, regionFilter), [data, regionFilter]);

  return tableData;
};

export default useRainfallData;

