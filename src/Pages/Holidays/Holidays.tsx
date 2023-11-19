import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import { HolidaysTable } from './HolidaysTable';

export type HolidaysType = {
  number: number;
  name: string;
  date: string;
  weekday: { date?: { name: string } } | string;
  isPublic: boolean;
};

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const { countryId } = useParams();

  useEffect(() => {
    const getHolidays = async () => {
      try {
        const response = await axios.get(`https://holidayapi.com/v1/holidays?country=${countryId}&year=2022&key=${process.env.REACT_APP_ACCESS_KEY}`);
        setHolidays(response.data.holidays);
      } catch (error) {
        console.log(error);
      }
    };

    getHolidays();
  }, []);

  return (
    <div>
      <Header title="List of holidays" />
      {holidays.map((el: HolidaysType, i) => {
        const weekdayName = typeof el.weekday === 'object' && el.weekday?.date?.name ? el.weekday.date.name : 'N/A';
        return <HolidaysTable key={el.name} number={i} name={el.name} date={el.date} weekday={weekdayName} isPublic={el.isPublic} />;
      })}
    </div>
  );
};

export default Holidays;
