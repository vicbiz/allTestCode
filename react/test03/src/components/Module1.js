import React from "react";

export const M1 = (props) => {
  props.setName("Jae");
  return (
    <div>
      <h2>M1.. using prop.var</h2>
      <p>{props.msg1}</p>
      <p>{props.msg2}</p>
    </div>
  );
};

export const M2 = ({ msg3: message, msg4 }) => {
  return (
    <div>
      <h2>M2.. destructuered</h2>
      <p>new variable from msg3 to message : {message}</p>
      <p>{msg4}</p>
    </div>
  );
};
