import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectList, { Props } from '../components/select';

const createProps = (): Props => ({
  value: 'hello',
  options: ['hello', 'hi', "s'up"],
  label: 'greeting',
  handleChange: jest.fn(),
});

test('SelectList should render an accessible select element', async () => {
  /**
   * Given a SelectList is rendered with props
   * Then it should display an accessible button named with the label prop
   * When it is clicked
   * Then the options should be displayed
   * When an option is clicked
   * Then the handleChange prop should be called with the option value
   */
  
  const props = createProps();
  render(<SelectList {...props} />);

  const user = userEvent.setup();
  const button = screen.getByRole('button', { name: 'greeting' });
  await user.click(button);

  expect(screen.getByRole('option', { name: '-'})).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'hello'})).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'hi'})).toBeInTheDocument();
  expect(screen.getByRole('option', { name: "s'up"})).toBeInTheDocument();

  const optionHi = screen.getByRole('option', { name: 'hi'});
  await user.click(optionHi);

  expect(props.handleChange).toHaveBeenCalledWith('hi');
});