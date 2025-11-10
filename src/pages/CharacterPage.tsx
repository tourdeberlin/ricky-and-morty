import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import CharacterModal from '../components/CharacterModal/CharacterModal';
import type { FilteredCharacter } from '../types';
import Loader from '../components/Loader/Loader';

const CharacterPage: React.FC = () => {
  const [character, setCharacter] = useState<FilteredCharacter | null>(null);
  const [, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError('Character ID is missing');
      setIsLoading(false);
      return;
    }
    const fetchCharacter = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch character: ${response.status} ${response.statusText}`
          );
        }

        const data: FilteredCharacter = await response.json();
        setCharacter(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setCharacter(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  const handleCloseModal = () => {
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return <CharacterModal character={character} onClose={handleCloseModal} />;
};

export default CharacterPage;
