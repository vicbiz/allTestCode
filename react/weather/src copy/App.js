import React from 'react';
import styled from '@emotion/styled';

import WeatherEngine from './components/WeatherEngine'

import './App.css';

function App() {

  const WeatherAppBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
`

  return (
    <div className="App">
      <WeatherAppBlock>
        <WeatherEngine initLocation = 'Atlanta, US' />>
        <WeatherEngine initLocation = 'London, gb' />>
      </WeatherAppBlock>
    </div>
  );
}

export default App;
