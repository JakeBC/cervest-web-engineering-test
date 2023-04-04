import { useMemo } from 'react';
import useSWR, { Fetcher } from 'swr';
import { RainfallData, RainfallItem, RainfallTableData, RegionValue } from '../types/rainfall';

/**
 * Fetcher function for use with swr
 * @param url 
 * @returns Promise<any>
 */
const fetcher: Fetcher<any> = (url: string) => fetch(url).then(res => res.json());

const filterRainfallData = (data: RainfallData, region: string) => {
  const applyRegionFilter = (item: RainfallItem) => ({
    ...item,
    data: item.data.filter((data: RegionValue) => data.regionName === region),
  });

  return data.map(applyRegionFilter);
};

/**
 * Transforms api rainfall data to a format suitable for parsing when populating an html table
 * @param rainfall 
 * @param regionFilter
 * @returns rainfall data for table display along with rainfall summary data
 */
export const prepareTableData = (rainfall: RainfallData = [], regionFilter?: string) => {
  const dates = rainfall.map((item) => new Date(item.date).toLocaleDateString());
  const tableHeader = ['Region', ...dates];

  const allTableData: RainfallTableData = {
    table: [tableHeader],
    regions: [],
    totalRainfall: 0,
    consecutiveDaysOver10mm: 0,
    count: 0,
  };

  const tableData = rainfall.reduce((col, item, columnIndex) => {
    item.data.forEach(({ regionName, value }, rowIndex) => {
      // for the first date populate a regions list and the first column of the table
      if (columnIndex === 0) {
        col.table.push([regionName]);
        col.regions.push(regionName);
      }

      // push rainfall values into each table region row
      col.table[rowIndex+1].push(value.toString());
      
      // increment the total rainfall value
      col.totalRainfall += value;

      // count the number of rainfall values
      col.count += 1;
    });

    return col;
  }, allTableData);

  return tableData;
};

/**
 * Fetches rainfall data and returns that in a format suitable for tabular display.
 * Dates in columns, regions in rows.
 * @param region 
 */
const useRainfallData = (regionFilter?: string) => {
  const { data } = useSWR<RainfallData>('/api/rainfall', fetcher);

  const tableData = useMemo(() => prepareTableData(data, regionFilter), [data, regionFilter]);

  return tableData;
};

export default useRainfallData;

