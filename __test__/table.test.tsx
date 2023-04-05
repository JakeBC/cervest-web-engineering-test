import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RainfallTable, { Props } from '../components/table';

const createProps = (): Props => ({
  header: ['Count', 'Pineapples', 'Bananas', 'Oranges'],
  rows: [
    ['Monday', 1, 2, 300],
    ['Tuesday', 4, 2, 101],
  ],
});

test('RainfallTable should display the given props in table form', () => {
  /**
   * Given a RainfallTable is rendered with the above props
   * Then it should be accessible via the table role and the name 'rainfall data table'
   * And it should include 3 rows
   * And it should include the correct column headers
   * And it should include the correct number of cells
   */
  
  const props = createProps();
  render(<RainfallTable {...props} />);

  expect(screen.getByRole('table', { name: 'rainfall data table' })).toBeInTheDocument();
  expect(screen.getAllByRole('row')).toHaveLength(3);
  props.header.forEach((name) => {
    expect(screen.getByRole('columnheader', { name }));
  })
  expect(screen.getAllByRole('cell')).toHaveLength(8);
});