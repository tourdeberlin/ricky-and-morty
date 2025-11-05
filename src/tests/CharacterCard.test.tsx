import { render, screen } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard/CharacterCard';

interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
  episode: string[];
}

const sampleCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  gender: 'Male',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/3',
  ],
};

describe('CaracterCard', () => {
  it('image renders successfully', () => {
    render(<CharacterCard character={sampleCharacter} />);

    const img = screen.getByRole('img', { name: sampleCharacter.name });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toContain(sampleCharacter.image);
    expect(img).toHaveAttribute('alt', sampleCharacter.name);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      sampleCharacter.name
    );
  });

  it('displays gender, species и status', () => {
    render(<CharacterCard character={sampleCharacter} />);

    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();

    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Species')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('correctly displays the number of episodes', () => {
    render(<CharacterCard character={sampleCharacter} />);

    expect(screen.getByText(/Appears in 3 episodes/i)).toBeInTheDocument();
  });

  it('works with zero episodes (shows 0)', () => {
    const emptyEpisodes = { ...sampleCharacter, episode: [] };
    render(<CharacterCard character={emptyEpisodes} />);

    expect(screen.getByText(/Appears in 0 episodes/i)).toBeInTheDocument();
  });
});
