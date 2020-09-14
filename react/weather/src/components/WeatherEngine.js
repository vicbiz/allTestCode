import React, { useState, useEffect } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// If you want to use the provided css
import "react-google-places-autocomplete/dist/assets/index.css";
import loader from "../assets/svgLoaders/rings.svg";

import WeatherCard from "./weathercard/card";

const WeatherEngine = ({ initLocation }) => {
  // http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=8b43bb956536fbe57661fc0a64c25418
  // http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=8b43bb956536fbe57661fc0a64c25418
  // http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=Imperial&appid=8b43bb956536fbe57661fc0a64c25418

  // Google Places API
  // https://maps.googleapis.com/maps/api/place/autocomplete/json?input=1600+Amphitheatre&key=AIzaSyA_kl4XxSgUyGG2pAA6EejzWSiVuPYvQ1A

  const [query, setQuery] = useState(initLocation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const [temp, setTemp] = useState('');
  // const [condition, setCondition] = useState('');
  // const [city, setCity] = useState('');
  // const [country, setCountry] = useState('');
  const [weather, setWeather] = useState({
    temp: null,
    condition: null,
    city: null,
    country: null
  });

  const getWeather = async q => {
    setLoading(true);
    try {
      const apiKey = "8b43bb956536fbe57661fc0a64c25418";
      const apiRest = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${apiKey}`
      );
      const restJSON = await apiRest.json();
      console.log(restJSON);
      setWeather({
        temp: restJSON.main.temp,
        condition: restJSON.weather[0].main,
        city: restJSON.name,
        country: restJSON.sys.country
      });
    } catch (e) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  const handleSearch = e => {
    setQuery(e);
  };

  useEffect(() => {
    getWeather(query);
  }, [query]);

  useEffect(() => {
    getWeather(initLocation);
  }, [initLocation]);

  return (
    <div>
      {loading ? (
        // <div style={{color: '#000000'}}>Loading...</div>
        <img src={loader} alt="loading..." />
      ) : (
        <>
          <WeatherCard
            temp={weather.temp}
            condition={weather.condition}
            city={weather.city}
            country={weather.country}
          />
          <form>
            {/* Lose Focus */}
            {/* <input value={query} onChange={ e => setQuery(e.target.value)}/> */}
            {/* <input value={query} onChange={ handleChange }/> */}

            <GooglePlacesAutocomplete
              autocompletionRequest={{
                types: ["(cities)"]
              }}
              placeholder={query}
              loader={<img src={loader} alt="Loading..." />}
              initialValue={query}
              //   onSelect={console.log}
              onSelect={({ description }) => handleSearch(description)}
            />
            {/* <button onClick={e => handleSearch(query)}>Search</button> */}
          </form>
        </>
      )}
    </div>
  );
};

export default WeatherEngine;
