import React, { useState, useEffect } from "react";
import logo from "../logo.svg";

function Header({ title }) {
  const [speed, setSpeed] = useState(10);

  const speedUp = () => {
    console.log("speedUp", speed);
    setSpeed(speed > 1 ? speed - 1 : speed);
  };

  const speedDown = () => {
    console.log("speedDown", speed);
    setSpeed(speed + 1);
  };

  useEffect(() => {
    console.log("speed", speed);
    setSpeed(speed);
  }, [speed]);

  return (
    <header className="App-header">
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        style={{ animation: `App-logo-spin infinite ${speed}s linear` }}
      />
      <div className="textSmall">Spin Speed : {speed}</div>
      <div>
        <button className="btn" onClick={e => speedUp()}>
          Speed Up
        </button>
        <button className="btn" onClick={e => speedDown()}>
          Speed Down
        </button>
      </div>
      <p className="textSmall">{title}</p>
    </header>
  );
}

export default Header;
