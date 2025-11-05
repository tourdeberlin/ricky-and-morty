import { render, screen } from '@testing-library/react';
import NoResults from '../components/NoResults/NoResults';

describe('SearchForm', () => {
  it('displays text about no results', () => {
    render(<NoResults />);

    expect(
      screen.getByText('This character does not exist')
    ).toBeInTheDocument();
    expect(screen.getByText('Try a different name')).toBeInTheDocument();
  });

  it('renders image with correct alt-text', () => {
    render(<NoResults />);

    const image = screen.getByAltText('No results found');
    expect(image).toBeInTheDocument();
  });
});
