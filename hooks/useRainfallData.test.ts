import { RainfallTableData } from '../types/rainfall';
import { prepareTableData } from './useRainfallData';

test('prepareTableData should transform rainfall data correctly', () => {
  /**
   * Given some rainfall data
   * When it is passed to prepareTableData
   * Then the correct table data should be returned
   */

  const testData = [
    {
      date: '2023-01-10T21:15:00.000Z',
      data: [
        {
          regionName: 'France',
          value: 9,
        },
        {
          regionName: 'Spain',
          value: 8,
        },
        {
          regionName: 'Norway',
          value: 3,
        },
      ],
    },
    {
      date: '2023-01-11T21:15:00.000Z',
      data: [
        {
          regionName: 'France',
          value: 14,
        },
        {
          regionName: 'Spain',
          value: 12,
        },
        {
          regionName: 'Norway',
          value: 9,
        },
      ],
    }
  ];

  // the expected format should include a header with dates in the locale format
  // followed by a row for each region
  const expectedResult: RainfallTableData = {
    count: 6,
    regions: ['France', 'Spain', 'Norway'],
    table: [
      ['Region', '1/10/2023', '1/11/2023'],
      ['France', '9', '14'],
      ['Spain', '8', '12'],
      ['Norway', '3', '9'],
    ],
    totalRainfall: 55,
    consecutiveDaysOver10mm: 0,
  };


  const result = prepareTableData(testData);
  expect(result).toEqual(expectedResult);
});