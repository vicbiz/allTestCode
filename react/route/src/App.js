import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Destinations from "./components/Destinations";
import About from "./components/About";
import DestinationDetail from "./components/DestinationDetail";
import DestinationContextProvider from "./contexts/DestinationContext";

// useState **************s
// import FetchDataOne from "./components/FetchDataOne";

// useReducer **************
// import FetchDataTwo from "./components/FetchDataTwo";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <DestinationContextProvider>
              <Route path="/" exact component={Home} />
              <Route path="/destinations" exact component={Destinations} />
              <Route path="/destination/:id" component={DestinationDetail} />

              {/* <Route path="/about" exact component={About} /> */}
              <Route
                path="/about"
                exact
                component={() => <About test="Say your name" />}
              />
            </DestinationContextProvider>
          </Switch>
        </div>
      </Router>
      {/* <FetchDataOne /> */}
      {/* <FetchDataTwo /> */}
    </>
  );
}

export default App;
