import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Holidays = ()=> {
    const [holidays, setHolidays] = useState([]);
    const {countryId} = useParams();

    const getHolidays = async ()=> {
        try{
            const response = await axios.get(`https://holidayapi.com/v1/holidays?country=${countryId}&year=2022&key=${process.env.REACT_APP_ACCESS_KEY}`)
            setHolidays(response.data.holidays)
        }catch(error){
            console.log(error)
        }
        console.log(holidays)
    }
    useEffect(()=>{
        getHolidays()
    },[])
    return (
        <div>
                <table className="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Name</td>
                        <td>Date</td>
                        <td>Weekday</td>
                        <td>Public</td>
                    </tr>
                </thead>
                <tbody>
                    {holidays.map((el, i)=> {
                        return (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{el.name}</td>
                                <td>{el.date}</td>
                                <td>{el.weekday.date.name}</td>
                                <td>{el.public && 'public'}</td>
                            </tr>
                        )
                    })}
           
                </tbody>
            </table>
        </div>
    )
}

export default Holidays;