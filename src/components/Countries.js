import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Countries = ()=> {
    const [countries, setCountries] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchCountries, setSearchCountries] = useState([]);
    const getCountries = async ()=> {
        try{
            const response = await axios.get(`https://holidayapi.com/v1/countries?key=${process.env.REACT_APP_ACCESS_KEY}`)
            setCountries(response.data.countries);
            setSearchCountries(response.data.countries);

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=> {
        getCountries();
    },[])
    useEffect(()=>{
        const timeout = setTimeout(()=> {
            if(countries.length){
                setSearchCountries(countries.filter((el) =>  el.name.includes(searchValue)))
            }
        },600)
        return ()=> clearTimeout(timeout);
    },[searchValue])
    return(
        <div>
            <h1>List of countries</h1>
            <input type="text" onChange={e => setSearchValue(e.target.value)} value={searchValue} />
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