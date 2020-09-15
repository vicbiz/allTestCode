import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Destinations from "./components/Destinations";
import About from "./components/About";
import DestinationDetail from "./components/DestinationDetail";

// import AllDestinations from "./components/AllDestinations";

function App() {
  // const AllDestinations = () => {
  const [allDestinations, setAllDestinations] = useState([]);
  // console.log("AAAAAAAAAAA");

  useEffect(() => {
    // console.log("useEffect");s
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(
      `https://www.forbestravelguide.com/api/destination.json`
    );
    const dataJson = await data.json();
    // console.log(dataJson);
    const destData = await dataJson.filter(
      it => it.active === true && it.archived === false
    );
    console.log("destData", destData);
    setAllDestinations(destData);
  };

  // if (destinations.length > 0) {
  //   console.log("aaa", destinations);
  //   return destinations;
  // }
  // };

  // AllDestinations();

  if (allDestinations.length > 0) {
    return (
      <>
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/" exact component={Home} />
              {/* <Route path="/destinations" exact component={Destinations} /> */}
              <Route
                path="/destinations"
                exact
                component={() => (
                  <Destinations destinations={allDestinations} />
                )}
              />
              {/* <Route path="/about" exact component={About} /> */}
              <Route
                path="/about"
                exact
                component={() => <About test="Moon" />}
              />
              <Route path="/destination/:id" component={DestinationDetail} />
            </Switch>
          </div>
        </Router>
        {/* {allDestinations.length > 0 ? (
          <>
            <div>Ready</div>
            {allDestinations.map(it => {
              return <div>{it.name}</div>;
            })}
          </>
        ) : (
          ""
        )}
        ; */}
      </>
    );
  } else {
    return <>Loading</>;
  }
}

export default App;
