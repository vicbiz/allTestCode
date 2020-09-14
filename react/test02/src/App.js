import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FtgArticles from "./components/FtgArticles";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header title="React Testing by JMoon" />
      <FtgArticles />
      <Footer text="This is footer text" />
    </div>
  );
}

export default App;


