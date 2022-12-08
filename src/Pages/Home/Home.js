
import { useState } from "react";
import { useForm } from "react-hook-form";

import './Home.css'
const Home = () => {
    const [city_name,SetCity_name] = useState('Dhaka');
    const [Temp,Settemp] = useState('22');
    const [Condition,Setcondition] = useState('Cloud');
    const [urlicon,Seturlicon] = useState('https://openweathermap.org/img/wn/02d@2x.png');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
   
    const onSubmit = data => {
        const city = data.city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5fb4212bdcd13d4494c8f5dbebc45e9e&units=metric`;
        fetch(url)
        .then(res => res.json())
        .then(data =>{
           
            SetCity_name(data.name)
            Settemp(data.main.temp)
            Setcondition(data.weather[0].main)
           Seturlicon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        });
    };


    return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="col-md-6 m-auto py-5">
            <div className="input-group mb-3">
                <input {...register("city")} type="text" className="form-control" placeholder="Enter a location for Weather ..."/>
                <div className="input-group-append">
                    <input  type="submit" className="btn btn-danger" value='Search'></input>
                </div>
            </div>
        </form>
       
        <div className="weather-status text-white text-center">
            <img id="Weather_icon" src={urlicon} alt=""/>
            <h1  id="city_name">{city_name}</h1>
            <h3><span  >{Temp}</span>&deg;C</h3>
            <p  className="lead">{Condition}</p>
        </div>
        </div>
    );
};

export default Home;