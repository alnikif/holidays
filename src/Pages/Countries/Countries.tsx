import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';
import Header from '../../components/Header';
import { Search } from '../../components/Search';
import { CountriesTable } from './CountriesTable';
import { NotificationError } from '../../components/NotificationError/NotificationError';
import { CellType } from '../../components/Table/CellType';
import { BodyCellType } from '../../components/Table/Table';

export type CountryType = {
  name: string;
  code: string;
  flag: string;
  currencies: Record<string, string>[];
  languages: string[];
  number: string | number;
};

const headerRowConfig = [
  { label: 'Country Name', cellType: CellType.name },
  { label: 'Flag', cellType: CellType.flag },
  { label: 'Code', cellType: CellType.code },
  { label: 'Currencies', cellType: CellType.currencies },
  { label: 'Languages', cellType: CellType.languages }
];

const Countries = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedSearchValue = useDebounce(searchValue);

  const bodyRowsConfig = countries.reduce((acc: BodyCellType[][], country) => {
    const { name, code, currencies, flag, languages } = country;

    const rowConfig = [
      { cellType: CellType.name, value: name },
      { cellType: CellType.flag, value: flag },
      { cellType: CellType.code, value: code },
      { cellType: CellType.currencies, value: currencies },
      { cellType: CellType.languages, value: languages },
      { cellType: CellType.link, value: code }
    ];

    return [...acc, rowConfig];
  }, [] as BodyCellType[][]);

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
        />
      ))}

      {loading && <div>Loading...</div>}
    </div>
  );
};

export default memo(Countries);
