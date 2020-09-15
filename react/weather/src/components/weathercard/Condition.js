import React from 'react';
import styled from '@emotion/styled';

const Condition = ({temp, condition}) => {

    const Temp = styled.div`
        font-family: 'Fira Sans', sans-serif;
        font-size: 1.5rem;
        font-weight: 200;
    `

    const State = styled.div`
        font-family: 'Marriweather', sans-serif;
        font-size: 0.7rem;
        text-transform: uppercase;
    `

    return (
        <>
            <Temp>{temp} ˚C</Temp>
            <State>{condition}</State>
        </>
    )
}

export default Condition;