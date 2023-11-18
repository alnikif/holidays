import React, { EffectCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import Header from './Header';

type CountriesType = {
  name: string;
  code: string;
  flag: string;
  currencies: Record<any, any>[];
  languages: string[];
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

    setSearchCountries(countries.filter((el: CountriesType) => el.name.toLowerCase().includes(debouncedSearchValue)));
  }, [countries, debouncedSearchValue]);

  const onSearchChange = (e: { target: { value: string } }) => setSearchValue(e.target.value.toLowerCase());

  return (
    <div>
      <Header title="List of countries" />
      <input type="text" value={searchValue} onChange={onSearchChange} />
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Country</th>
            <th>Flag</th>
            <th>Code</th>
            <td>Currencies</td>
            <th className="languagesColumn">Languages</th>
            <td>Holidays</td>
          </tr>
        </thead>
        <tbody>
          {searchCountries.map((el: CountriesType, i) => {
            return (
              <tr key={el.code}>
                <td>{i}</td>
                <td>{el.name}</td>
                <td>
                  <img src={el.flag} alt="Flag" />
                </td>
                <td>{el.code}</td>
                <td>
                  {el.currencies.map((item, index) => {
                    return <span key={el.code}>{item.alpha}</span>;
                  })}
                </td>
                <td className="languagesColumn">
                  {el.languages.map((element, indexLanguage) => (
                    <span key={element}>{element} </span>
                  ))}
                </td>
                <td>
                  <Link to={`/holidays/${el.code}`}>View holiday list</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Countries;
