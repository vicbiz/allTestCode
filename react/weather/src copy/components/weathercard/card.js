import React from 'react';
import styled from '@emotion/styled';

import Location from './Location';
import Icon from './Icon';
import Condition from './Condition';


const WeatherCard = ({temp, condition, city, country}) => {

    let highColor = (1- ((temp - 12)/28)) * 255;
    let lowColor = highColor - 255;
    let bg = null;

    if(temp > 12){
        highColor = (1- ((temp - 12)/28)) * 255;
        lowColor = highColor - 255;
        bg = `
            to top, 
            rgb(255, ${highColor}, 0), 
            rgb(255, ${lowColor}, 0)
        `
    } else if(temp <= 12){
        highColor = (1- ((temp + 20)/32)) * 255;
        lowColor = highColor - 150;
        bg = `
            to top, 
            rgb(0, ${highColor}, 255), 
            rgb(0, ${lowColor}, 255)
        `
    }



    const Card = styled.div`
        background: linear-gradient(${bg});
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        -webkit-box-align: center;
        align-items: center;
        min-height: 200px;
        height: 26vh;
        max-height: 240px;
        position: relative;
        min-width: 140px;
        width: 80%;
        max-width: 150px;
        padding: 11px;
        margin: 11px 10px;
        border-radius: 15px;
        transition: width 0.5s ease-in 0s;
    `

    return (
        <Card>
            <Location city={city} country={country}/>
            <Icon condition={condition}/>
            <Condition temp={temp} condition={condition}/>
        </Card>
    )
}

export default WeatherCard;