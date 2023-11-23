import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';
import Header from '../../components/Header';
import { Search } from '../../components/Search';
import { NotificationError } from '../../components/NotificationError/NotificationError';
import { CellType } from '../../components/Table/CellType';
import { Table } from '../../components/Table/Table';
import { BodyCellType, BodyRowType } from '../../components/Table/BodyRow/BodyRows';

export type CountryType = {
  name: string;
  code: string;
  flag: string;
  currencies: Record<string, string>[];
  languages: string[];
  number: string | number;
};

const headerCountriesRowConfig = [
  { key: 'index', label: '#', cellType: CellType.index, width: 50 },
  { key: 'name', label: 'Country Name', cellType: CellType.name, width: 400 },
  { key: 'flag', label: 'Flag', cellType: CellType.flag, width: 200 },
  { key: 'code', label: 'Code', cellType: CellType.code, width: 200 },
  { key: 'currencies', label: 'Currencies', cellType: CellType.currencies, width: 200 },
  { key: 'languages', label: 'Languages', cellType: CellType.languages, width: 200 },
  { key: 'link', label: 'Link', cellType: CellType.link, width: 200 }
];

const Countries = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedSearchValue = useDebounce(searchValue);

  const bodyRowsConfig = countries.reduce((acc, country, index) => {
    const { name, code, currencies, flag, languages } = country;

    const bodyCountriesRowCells = [
      { key: `${name}/index`, columnKey: 'index', cellType: CellType.index, value: index + 1 },
      { key: `${name}/name`, columnKey: 'name', cellType: CellType.name, value: name },
      { key: `${name}/flag`, columnKey: 'flag', cellType: CellType.flag, value: flag },
      { key: `${name}/code`, columnKey: 'code', cellType: CellType.code, value: code },
      { key: `${name}/currencies`, columnKey: 'currencies', cellType: CellType.currencies, value: currencies },
      { key: `${name}/languages`, columnKey: 'languages', cellType: CellType.languages, value: languages },
      { key: `${name}/link`, columnKey: 'link', cellType: CellType.link, value: code }
    ];

    const bodyRow = { key: name, cells: bodyCountriesRowCells };

    return [...acc, bodyRow];
  }, [] as BodyRowType[]);

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

      <Table title="Countries" headerRow={headerCountriesRowConfig} bodyRows={bodyRowsConfig} />

      {loading && <div>Loading...</div>}
    </div>
  );
};

export default memo(Countries);
