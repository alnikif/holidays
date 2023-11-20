import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';
import Header from '../../components/Header';
import { Search } from '../../components/Search';
import { CountriesTable } from './CountriesTable';
import { NotificationError } from '../../components/NotificationError/NotificationError';

export type CountryType = {
  name: string;
  code: string;
  flag: string;
  currencies: Record<string, string>[];
  languages: string[];
  number: string | number;
  linkUrl: string;
};

const Countries = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    axios
      .get(`https://holidayapi.com/v1/countries?key=${process.env.REACT_APP_ACCESS_KEY}&search=${debouncedSearchValue}`)
      .then((response) => {
        const {
          data: { countries: listCountries }
        } = response;
        setCountries(listCountries);
        setError(null);
      })
      .catch((apiError: unknown) => {
        if (apiError instanceof Error) {
          setError(apiError);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearchValue]);

  const onSearchChange = (nextSearchValue: string) => setSearchValue(nextSearchValue.toLowerCase());

  return (
    <div>
      <NotificationError title="Fetch countries error notification" message={error?.message} />

      <Header title="List of countries" />
      <Search value={searchValue} onChange={onSearchChange} />

      {countries.map((el, index) => (
        <CountriesTable
          key={el.name}
          number={index + 1}
          name={el.name}
          flag={el.flag}
          code={el.code}
          currencies={el.currencies}
          languages={el.languages}
          linkUrl={el.code}
        />
      ))}

      {loading && <div>Loading...</div>}
    </div>
  );
};

export default memo(Countries);
