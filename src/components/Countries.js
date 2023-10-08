import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Countries = ()=> {
    const [countries, setCountries] = useState([]);
    const getCountries = async ()=> {
        try{
            const response = await axios.get(`https://holidayapi.com/v1/countries?key=${process.env.REACT_APP_ACCESS_KEY}`)
            setCountries(response.data.countries);
            console.log(response)

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=> {
        getCountries();
    },[])
    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Country</td>
                        <td>Flag</td>
                        <td>Code</td>
                        <td>Currencies</td>
                        <td>Languages</td>
                        <td>Holidays</td>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((el, i)=> {
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
                                <td>
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