import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useDebounce from '../hooks/useDebounce';

const Countries = ()=> {
    const [countries, setCountries] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchCountries, setSearchCountries] = useState([]);
    const debouncedSearchValue = useDebounce(searchValue);

    const getCountries = async ()=> {
        try{
            const response = await axios.get(`https://holidayapi.com/v1/countries?key=${process.env.REACT_APP_ACCESS_KEY}`)
            const { data: { countries } } = response;

            setCountries(countries);
            setSearchCountries(countries);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=> {
        getCountries();
    },[]);

    useEffect(()=>{
        if(!countries.length) return;

        setSearchCountries(countries.filter((el) =>  el.name.toLowerCase().includes(debouncedSearchValue)))
    },[countries ,debouncedSearchValue]);

    const onSearchChange = e => setSearchValue(e.target.value.toLowerCase());

    return(
        <div>
            <h1>List of countries</h1>
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
                    {searchCountries.map((el, i)=> {
                        return (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{el.name}</td>
                                <td><img src={el.flag} alt="Flag"/></td>
                                <td>{el.code}</td>
                                <td>
                                    {el.currencies.map((item,i)=> {
                                        return <span key={i}>{item.alpha}</span>
                                    })}
                                </td>
                                <td className="languagesColumn">
                                    {el.languages.map((el,i)=> <span key={i}>{el} </span>)}
                                </td>
                                <td><Link to={`/holidays/${el.code}`}>View holiday list</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Countries;