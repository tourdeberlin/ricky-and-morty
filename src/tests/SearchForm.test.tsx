import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import SearchForm from '../components/SearchForm/SearchForm';

describe('SearchForm', () => {
  const mockOnInputChange = vi.fn();
  const mockOnSearchSubmit = vi.fn((e) => e.preventDefault());

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and button', () => {
    render(
      <SearchForm
        inputValue=""
        onInputChange={mockOnInputChange}
        onSearchSubmit={mockOnSearchSubmit}
      />
    );

    expect(
      screen.getByPlaceholderText('Search for a character...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays the current input value', () => {
    const testValue = 'Rick';

    render(
      <SearchForm
        inputValue={testValue}
        onInputChange={mockOnInputChange}
        onSearchSubmit={mockOnSearchSubmit}
      />
    );

    expect(screen.getByDisplayValue(testValue)).toBeInTheDocument();
  });

  it('calls onInputChange when input value changes', async () => {
    render(
      <SearchForm
        inputValue=""
        onInputChange={mockOnInputChange}
        onSearchSubmit={mockOnSearchSubmit}
      />
    );

    const input = screen.getByPlaceholderText('Search for a character...');
    await userEvent.type(input, 'Rick');

    expect(mockOnInputChange).toHaveBeenCalled();
  });

  test('input handler function is called when user types value in input field', async () => {
    const testValue = 'Rick';
    render(
      <SearchForm
        inputValue={testValue}
        onInputChange={mockOnInputChange}
        onSearchSubmit={mockOnSearchSubmit}
      />
    );

    await userEvent.type(screen.getByRole('textbox'), 'Name');

    expect(mockOnInputChange).toHaveBeenCalled();
  });

  it('calls onSearchSubmit when form is submitted', () => {
    render(
      <SearchForm
        inputValue="test"
        onInputChange={mockOnInputChange}
        onSearchSubmit={mockOnSearchSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    expect(mockOnSearchSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSearchSubmit).toHaveBeenCalledWith(expect.any(Object));
  });
});
