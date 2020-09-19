import React, { Component } from "react";

export class Module2 extends Component {
  render() {
    const { msg5, msg6 } = this.props;
    return (
      <div>
        <h3>Module 3</h3>
        <p>{msg5}</p>
        <p>{msg6}</p>
      </div>
    );
  }
}

export default Module2;
