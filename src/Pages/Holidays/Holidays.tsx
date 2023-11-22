import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CellType } from '../../components/Table/CellType';
import { BodyRowType, Table } from '../../components/Table/Table';
import { Search } from '../../components/Search';
import useDebounce from '../../hooks/useDebounce';
import { NotificationError } from '../../components/NotificationError/NotificationError';

export type HolidaysType = {
  number: number;
  name: string;
  date: string;
  weekday: { date?: { name: string } } | string;
  isPublic: string;
};

const headerRowConfig = [
  { key: 'Holiday name', label: 'Holiday name', cellType: CellType.name },
  { key: 'Date', label: 'Date', cellType: CellType.date },
  { key: 'Weekday', label: 'Weekday', cellType: CellType.weekday },
  { key: 'Public', label: 'Public', cellType: CellType.public }
];

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const { countryId } = useParams();
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    const getHolidays = () => {
      axios
        .get(
          `https://holidayapi.com/v1/holidays?country=${countryId}&year=2022&key=${process.env.REACT_APP_ACCESS_KEY}&search=${debouncedSearchValue}`
        )
        .then((response) => {
          const {
            data: { holidays: listHolidays }
          } = response;
          setHolidays(listHolidays);
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
    };

    getHolidays();
  }, [debouncedSearchValue]);

  const bodyRowsConfig = holidays.reduce((acc: BodyRowType[], holiday) => {
    const { name, date, weekday, flag, public: isPublic } = holiday;

    const bodyCountriesRowCells = [
      { key: `${name}/CountryName`, cellType: CellType.name, value: name },
      { key: `${name}/Date`, cellType: CellType.date, value: date },
      { key: `${name}/Weekday`, cellType: CellType.weekday, value: weekday },
      { key: `${name}/Public`, cellType: CellType.public, value: isPublic }
    ];

    const bodyRow = { key: name, cells: bodyCountriesRowCells };

    return [...acc, bodyRow];
  }, [] as BodyRowType[]);

  const onSearchChange = (nextSearchValue: string) => setSearchValue(nextSearchValue.toLowerCase());

  return (
    <div>
      <NotificationError title="Fetch countries error notification" message={error?.message} />

      <Search value={searchValue} onChange={onSearchChange} />
      <Table title="Holidays" headerRow={headerRowConfig} bodyRows={bodyRowsConfig} />
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Holidays;
