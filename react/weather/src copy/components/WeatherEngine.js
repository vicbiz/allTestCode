import React, {useState, useEffect} from 'react';
import WeatherCard from './weathercard/card'

const WeatherEngine = ({initLocation}) => {

    // http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=8b43bb956536fbe57661fc0a64c25418
    // http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=8b43bb956536fbe57661fc0a64c25418
    // http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=Imperial&appid=8b43bb956536fbe57661fc0a64c25418

    const [query, setQuery] = useState('');
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
      country: null,
    });

    const getWeather = async(q) => {
        setLoading(true);
        try {
            const apiKey = '8b43bb956536fbe57661fc0a64c25418';
            const apiRest = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${apiKey}`);
            const restJSON = await apiRest.json();
            // console.log(restJSON);
            setWeather({
                temp: restJSON.main.temp,
                condition: restJSON.weather[0].main,
                city: restJSON.name,
                country: restJSON.sys.country,
            })
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    const handleSearch = e => {
      e.preventDefault();
      getWeather(query);
    }


    useEffect(() => {
      getWeather(initLocation);
    },[initLocation]);

    const handleChange = e => {
        setQuery(e.target.value)
    }


  return (
    <div>
        {loading ? (
            <div style={{color: '#000000'}}>Loading...</div>
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
                
                <input value={query} onChange={ handleChange }/>
                <button onClick={e => handleSearch(e)}>Search</button>
                </form>
            </>
        )}
    </div>
  );
}

export default WeatherEngine;
