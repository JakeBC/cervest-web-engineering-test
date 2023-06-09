import { testData } from './test_data';
import { RainfallTableData } from '../types/rainfall';
import { prepareTableData } from '../hooks/useRainfallData';

test('prepareTableData should transform rainfall data correctly', () => {
  /**
   * Given some rainfall data
   * When it is passed to prepareTableData
   * Then the correct table data should be returned
   */

  // the expected format should include a header with dates in the locale format
  // followed by a row for each region
  const expectedResult: RainfallTableData = {
    regions: ['France', 'Spain', 'Norway'],
    table: [
      ['Region', '1/10/2023', '1/11/2023'],
      ['France', '9', '14'],
      ['Spain', '8', '12'],
      ['Norway', '3', '9'],
    ],
    totalRainfall: 55,
    averageRainfall: 9,
    consecutiveDaysOver10mm: 2,
  };


  const result = prepareTableData(testData);
  expect(result).toEqual(expectedResult);
});

test('prepareTableData should filter rainfall data according to the given regionFilter', () => {
  /**
   * Given some rainfall data
   * And a regionFilter value
   * When it is passed to prepareTableData
   * Then the correct table data should be returned
   */

   const expectedResult: RainfallTableData = {
    regions: ['France', 'Spain', 'Norway'],
    table: [
      ['Region', '1/10/2023', '1/11/2023'],
      ['Spain', '8', '12'],
    ],
    totalRainfall: 20,
    averageRainfall: 10,
    consecutiveDaysOver10mm: 1,
  };


  const result = prepareTableData(testData, 'Spain');
  expect(result).toEqual(expectedResult);
});