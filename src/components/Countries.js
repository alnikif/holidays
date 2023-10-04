import React, { useEffect, useState } from "react";
import axios from "axios";

const Countries = ()=> {
    const [countries, setCountries] = useState([]);
    const getCountries = async ()=> {
        try{
            const response = await axios.get(`https://holidayapi.com/v1/countries?key=483de38c-d181-44f2-ba1e-3ef144d50ec0`)
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
            <ul>
            {countries.map((el, i)=> {
                    return <li key={i}>{el.name}</li>
                })}
            </ul>
        </div>
    )
}

export default Countries;