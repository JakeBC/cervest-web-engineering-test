import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from "jest-fetch-mock";
import { testData } from '../test/test_data';
import Home from './index';

fetch.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify(testData));
});

/**
 * The tests here are by no means exhaustive - more could be written in order to cover edge cases
 * and assert all code paths result in expected behaviour...
 * These tests just cover a couple of happy paths for the main functionality.
 */

test('Home page should render rainfall and summary data', async () => {
  /**
   * Given the Home page renders
   * When rainfall data is returned from the api
   * Then all regions should be represented within the rainfall data table
   * And the rainfall summary table should include the correct values
   */

  await waitFor(() => render(<Home />));

  const rainfallDataTable = screen.getByRole('table', { name: 'rainfall data table' });
  const rainfallSummaryTable = screen.getByRole('table', { name: 'rainfall summary table' });

  expect(within(rainfallDataTable).getByRole('cell', { name: 'France' })).toBeInTheDocument();
  expect(within(rainfallDataTable).getByRole('cell', { name: 'Spain' })).toBeInTheDocument();
  expect(within(rainfallDataTable).getByRole('cell', { name: 'Norway' })).toBeInTheDocument();

  expect(within(rainfallSummaryTable).getAllByRole('cell').at(0)?.textContent).toEqual('55');
  expect(within(rainfallSummaryTable).getAllByRole('cell').at(1)?.textContent).toEqual('9');
  expect(within(rainfallSummaryTable).getAllByRole('cell').at(2)?.textContent).toEqual('2');
});

test('Home page should update data according to selected region filter', async () => {
  /**
   * Given the Home page renders
   * When rainfall data is returned from the api
   * And a user selects 'France' as a region to filter the data by
   * Then only France should be represented within the rainfall data table
   * And the rainfall summary table should include the correct updated values
   */

  await waitFor(() => render(<Home />));

  const user = userEvent.setup();
  const button = screen.getByRole('button', { name: 'Region' });
  await user.click(button);

  const optionFrance = screen.getByRole('option', { name: 'France' });
  await user.click(optionFrance);

  const rainfallDataTable = screen.getByRole('table', { name: 'rainfall data table' });
  expect(within(rainfallDataTable).getByRole('cell', { name: 'France' })).toBeInTheDocument();
  expect(within(rainfallDataTable).queryByRole('cell', { name: 'Spain' })).not.toBeInTheDocument();
  expect(within(rainfallDataTable).queryByRole('cell', { name: 'Norway' })).not.toBeInTheDocument();

  const rainfallSummaryTable = screen.getByRole('table', { name: 'rainfall summary table' });
  expect(within(rainfallSummaryTable).getAllByRole('cell').at(0)?.textContent).toEqual('23');
  expect(within(rainfallSummaryTable).getAllByRole('cell').at(1)?.textContent).toEqual('12');
  expect(within(rainfallSummaryTable).getAllByRole('cell').at(2)?.textContent).toEqual('1');
});