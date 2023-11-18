import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import Header from '../../Header';
import { Search } from '../../Search';
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

// <CountriesTable
//   number="#"
//   name="Country"
//   flag="Flag"
//   code="Code"
//   currenciesListCell="Currencies"
//   languagesListCell="Languages"
//   holidays="Holidays"
// />
//     <table className="table">
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Country</th>
//           <th>Flag</th>
//           <th>Code</th>
//           <td>Currencies</td>
//           <th className="languagesColumn">Languages</th>
//           <td>Holidays</td>
//         </tr>
//       </thead>
//       <tbody>
//         {searchCountries.map((el: CountryType, i) => {
//           return (
//             <tr key={el.code}>
//               <td>{i}</td>
//               <td>{el.name}</td>
//               <td>
//                 <img src={el.flag} alt="Flag" />
//               </td>
//               <td>{el.code}</td>
//               <td>
//                 {el.currencies.map((item: Record<string, string>, index: number) => {
//                   return <span key={el.code}>{item.alpha}</span>;
//                 })}
//               </td>
//               <td className="languagesColumn">
//                 {el.languages.map((element: string) => {
//                   console.log(el.languages);
//                   return <span key={element}>{element} </span>;
//                 })}
//               </td>
//               <td>
//                 <Link to={`/holidays/${el.code}`}>View holiday list</Link>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// );

export default Countries;
