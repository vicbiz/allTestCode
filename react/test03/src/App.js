import React, { useState } from "react";
import ReactDOM from "react-dom";

import { M1, M2 } from "./components/Module1";
import Module2 from "./components/Module2";

const App = () => {
  const [name, setName] = useState("");

  return (
    <div>
      <h1>Welcome</h1>
      <M1 msg1="Message1" msg2="Message2" setName={setName} />
      <M2 msg3="Message3" msg4="Message4" name={name} />
      <Module2 msg5="Message5" msg6="Message6" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
