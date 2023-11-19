import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import Header from '../../components/Header';
import { Search } from '../../components/Search';
import { CountriesTable } from './CountriesTable';

export type CountryType = {
  name: string;
  code: string;
  flag: string;
  currencies: Record<string, string>[];
  languages: string[];
  number: string | number;
  linkUrl: string;
};

const Countries = (): React.JSX.Element => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchCountries, setSearchCountries] = useState([]);
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    const getCountries = async (): Promise<void> => {
      try {
        const response = await axios.get(`https://holidayapi.com/v1/countries?key=${process.env.REACT_APP_ACCESS_KEY}`);
        const {
          data: { countries: listCountries }
        } = response;

        setCountries(listCountries);
        setSearchCountries(listCountries);
      } catch ({ message: errorMessage }) {
        const error = errorMessage;
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (!countries.length) return;

    setSearchCountries(countries.filter((el: CountryType) => el.name.toLowerCase().includes(debouncedSearchValue)));
  }, [countries, debouncedSearchValue]);

  const onSearchChange = (e: { target: { value: string } }) => setSearchValue(e.target.value.toLowerCase());

  return (
    <div>
      <Header title="List of countries" />
      <Search value={searchValue} onChange={onSearchChange} />
      {searchCountries.map((el: CountryType, i) => (
        <CountriesTable
          key={el.name}
          number={i + 1}
          name={el.name}
          flag={el.flag}
          code={el.code}
          currencies={el.currencies}
          languages={el.languages}
          linkUrl={el.code}
        />
      ))}
    </div>
  );
};

export default Countries;
