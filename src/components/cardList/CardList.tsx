import React from 'react';
import styles from './CardList.module.scss';
import CharacterCard from '../CharacterCard/CharacterCard';

import type { CardListProps } from '../types';

const CardList: React.FC<CardListProps> = ({ results }) => {
  return (
    <section className={styles.cardList}>
      {results.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </section>
  );
};

export default CardList;
