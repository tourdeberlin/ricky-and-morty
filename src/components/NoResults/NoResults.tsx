import noResultsImage from '../../assets/noResults.png';
import styles from './NoResults.module.scss';

const NoResults: React.FC = () => {
  return (
    <div className={styles.noResults}>
      <p>This character does not exist</p>
      <p>Try a different name</p>
      <img src={noResultsImage} alt="No results found" />
    </div>
  );
};

export default NoResults;
