import React, { useState } from 'react';
import placeholder from '../../assets/img-placeholder.webp';
import styles from './CharacterImage.module.scss';

interface CharacterImageProps {
  src?: string;
  alt?: string;
  isBig?: boolean;
}

const CharacterImage: React.FC<CharacterImageProps> = ({ src, alt, isBig }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={isBig ? styles.big : styles.small}>
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
