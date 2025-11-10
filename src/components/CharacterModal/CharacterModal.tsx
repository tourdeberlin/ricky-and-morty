import React, { useEffect, useRef } from 'react';
import styles from './CharacterModal.module.scss';
import type { FilteredCharacter } from '../../types';
import CharacterImage from '../CharacterImage/CharacterImage';

interface CharacterInfoProps {
  character: FilteredCharacter | null;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterInfoProps> = ({
  character,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (character) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [character]);

  if (!character) return null;
  const { name, image, gender, species, status, episode } = character;

  const infoList = [
    { label: 'Gender', value: gender },
    { label: 'Species', value: species },
    { label: 'Status', value: status },
  ];

  return (
    <dialog className={styles.dialog} ref={dialogRef} onClose={onClose}>
      <h3 className={styles.title}>{name}</h3>
      <button className={styles.close} onClick={onClose}>
        &times;
      </button>
      <CharacterImage src={image} alt={name} isBig={true} />

      <div className={styles.description}>
        {infoList.map(({ label, value }) => (
          <div className={styles.cardInfoItem} key={label}>
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}

        <div className={styles.cardEpisode}>
          Appears in {episode?.length} episodes
        </div>
      </div>
    </dialog>
  );
};

export default CharacterModal;
