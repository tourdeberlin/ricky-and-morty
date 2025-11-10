import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';

interface HeaderProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Header: React.FC<HeaderProps> = ({
  inputValue,
  onInputChange,
  onSearchSubmit,
}) => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Rick and Morty logo" />
      <SearchForm
        inputValue={inputValue}
        onInputChange={onInputChange}
        onSearchSubmit={onSearchSubmit}
      />
      <div></div>
    </header>
  );
};

export default Header;
