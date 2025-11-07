import React, { useState } from 'react';
import placeholder from '../../assets/img-placeholder.webp';
import styles from './CharacterImage.module.scss';

interface CharacterImageProps {
  src: string;
  alt: string;
}

const CharacterImage: React.FC<CharacterImageProps> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.container}>
      <img
        src={src}
        alt={alt}
        className={`${styles.cardImg} ${loaded ? styles.loader : ''}`}
        loading="lazy"
        onError={(event) => (event.currentTarget.src = placeholder)}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default CharacterImage;
