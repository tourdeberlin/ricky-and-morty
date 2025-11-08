import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

interface Character {
  name: string;
}

const CharacterPage: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await response.json();
      setCharacter(data);
    };
    fetchCharacter();
  }, []);
  return <div>{character?.name}</div>;
};

export default CharacterPage;
