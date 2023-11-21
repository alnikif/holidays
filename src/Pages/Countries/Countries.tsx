import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';
import Header from '../../components/Header';
import { Search } from '../../components/Search';
import { NotificationError } from '../../components/NotificationError/NotificationError';
import { CellType } from '../../components/Table/CellType';
import { BodyCellType, BodyRowType, Table } from '../../components/Table/Table';

export type CountryType = {
  name: string;
  code: string;
  flag: string;
  currencies: Record<string, string>[];
  languages: string[];
  number: string | number;
};

const headerRowConfig = [
  { key: 'CountryName', label: 'Country Name', cellType: CellType.name },
  { key: 'Flag', label: 'Flag', cellType: CellType.flag },
  { key: 'Code', label: 'Code', cellType: CellType.code },
  { key: 'Currencies', label: 'Currencies', cellType: CellType.currencies },
  { key: 'Languages', label: 'Languages', cellType: CellType.languages },
  { key: 'Link', label: 'Link', cellType: CellType.link }
];

const Countries = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const debouncedSearchValue = useDebounce(searchValue);

  const bodyRowsConfig = countries.reduce((acc: BodyRowType[], country) => {
    const { name, code, currencies, flag, languages } = country;

    const bodyRowCells = [
      { key: `${name}/CountryName`, cellType: CellType.name, value: name },
      { key: `${name}/Flag`, cellType: CellType.flag, value: flag },
      { key: `${name}/Code`, cellType: CellType.code, value: code },
      { key: `${name}/Currencies`, cellType: CellType.currencies, value: currencies },
      { key: `${name}/Languages`, cellType: CellType.languages, value: languages },
      { key: `${name}/Link`, cellType: CellType.link, value: code }
    ];

    const bodyRow = { key: name, cells: bodyRowCells };

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

      <Table title="Countries" headerRow={headerRowConfig} bodyRows={bodyRowsConfig} />

      {loading && <div>Loading...</div>}
    </div>
  );
};

export default memo(Countries);
