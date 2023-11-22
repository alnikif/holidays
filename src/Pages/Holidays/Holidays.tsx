import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CellType } from '../../components/Table/CellType';
import { BodyRowType, Table } from '../../components/Table/Table';
import { Search } from '../../components/Search';
import useDebounce from '../../hooks/useDebounce';

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

  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    const getHolidays = async () => {
      try {
        const response = await axios.get(
          `https://holidayapi.com/v1/holidays?country=${countryId}&year=2022&key=${process.env.REACT_APP_ACCESS_KEY}&search=${debouncedSearchValue}`
        );
        setHolidays(response.data.holidays);
      } catch (error) {
        console.log(error);
      }
    };

    getHolidays();
  }, [debouncedSearchValue]);

  const bodyRowsConfig = holidays.reduce((acc: BodyRowType[], country) => {
    const { name, date, weekday, flag, public: isPublic } = country;

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
      <Search value={searchValue} onChange={onSearchChange} />
      <Table title="Holidays" headerRow={headerRowConfig} bodyRows={bodyRowsConfig} />
    </div>
  );
};

export default Holidays;
