import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Destinations from "./components/Destinations";
import About from "./components/About";
import DestinationDetail from "./components/DestinationDetail";

// import AllDestinations from "./components/AllDestinations";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/destinations" exact component={Destinations} />
          {/* <Route path="/about" exact component={About} /> */}
          <Route path="/about" exact component={() => <About test="Moon" />} />
          <Route path="/destination/:id" component={DestinationDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
