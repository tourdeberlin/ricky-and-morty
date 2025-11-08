import React from 'react';
import { useState, useEffect } from 'react';
import type { Character } from '../types';
import { fetchCharacters } from '../services/characterService';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import NoResults from '../components/NoResults/NoResults';
import Pagination from '../components/Pagination/Pagination';
import CardList from '../components/CardList2/CardList2';
import { useSearchParams } from 'react-router';
import useLocalStorage from '../hooks/useLocalSrtorage';

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useLocalStorage('', '');
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadCharacters = async (
    value: string = '',
    page = 1
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const { results, totalPages } = await fetchCharacters(value, page);
      setSearchResults(results);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const urlName = searchParams.get('name') || '';
    const urlPage = Number(searchParams.get('page')) || 1;

    setInputValue(urlName);
    loadCharacters(urlName, urlPage);
  }, []);

  const handleSubmitButton = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const newPage = 1;
    setSearchParams({ name: inputValue, page: String(newPage) });
    loadCharacters(inputValue);
  };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setSearchParams({ page: String(page) });
    await loadCharacters(inputValue, page);
  };

  return (
    <>
      <Header
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e.target.value)}
        onSearchSubmit={handleSubmitButton}
      />

      {isLoading ? (
        <Loader />
      ) : searchResults.length ? (
        <>
          <CardList results={searchResults} />
          <div>
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <NoResults />
      )}

      {error && <div className="error">{error}</div>}
    </>
  );
};

export default App;
