import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CellType } from '../../components/Table/CellType';
import { Table } from '../../components/Table/Table';
import { Search } from '../../components/Search';
import useDebounce from '../../hooks/useDebounce';
import { NotificationError } from '../../components/NotificationError/NotificationError';
import { BodyRowType } from '../../components/Table/BodyRow/BodyRows';

export type HolidayType = {
  number: number;
  name: string;
  date: string;
  weekday: { date: { name: string } };
  public: boolean;
};

const headerRowConfig = [
  { key: 'index', label: '#', cellType: CellType.index, width: 50 },
  { key: 'name', label: 'Holiday name', cellType: CellType.name, width: 400 },
  { key: 'date', label: 'Date', cellType: CellType.date, width: 150 },
  { key: 'weekday', label: 'Weekday', cellType: CellType.weekday, width: 150 },
  { key: 'public', label: 'Public', cellType: CellType.public, width: 150 }
];

const Holidays = () => {
  const [holidays, setHolidays] = useState<HolidayType[]>([]);
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

  const bodyRowsConfig = holidays.reduce((acc, holiday, index) => {
    const { name, date, weekday, public: isPublic } = holiday;

    const bodyCountriesRowCells = [
      { key: `${name}/index`, columnKey: 'index', cellType: CellType.index, value: index + 1 },
      { key: `${name}/name`, columnKey: 'name', cellType: CellType.name, value: name },
      { key: `${name}/date`, columnKey: 'date', cellType: CellType.date, value: date },
      { key: `${name}/weekday`, columnKey: 'weekday', cellType: CellType.weekday, value: weekday },
      { key: `${name}/isPublic`, columnKey: 'public', cellType: CellType.public, value: isPublic }
    ];

    const bodyRow: BodyRowType = { key: name, cells: bodyCountriesRowCells };

    return [...acc, bodyRow];
  }, [] as BodyRowType[]);

  const onSearchChange = (nextSearchValue: string) => setSearchValue(nextSearchValue.toLowerCase());

  return (
    <div>
      <NotificationError title="Fetch countries error notification" message={error?.message} />

      <Search value={searchValue} onChange={onSearchChange} />
      <Table title="List of holidays" headerRow={headerRowConfig} bodyRows={bodyRowsConfig} />
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Holidays;
