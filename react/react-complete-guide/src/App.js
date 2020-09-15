import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Jae', age: 52 },
      { name: 'Max', age: 29 },
      { name: 'Stephanie', age: 24 },
    ]
  }

  switchNameHandler = (newName) => {
    // console.log('clicked !');
    // DON'T DO THIS : 
    // this.state.person[0].name = 'Jane';

    this.setState({
      persons: [
        { name: newName, age: 52 },
        { name: 'Maximilian', age: 29 },
        { name: 'Stephanie', age: 24 },
      ]
    });
  }

  nameChangedHandler = (e) => {
    this.setState({
      persons: [
        { name: 'Moon Jae Yeun', age: 52 },
        { name: e.target.value, age: 29 },
        { name: 'Stephanie', age: 21 },
      ]
    });
    console.log(document.querySelectorAll('input')[1].value);
  }


  render() {
    const personStyle = {
      backgroundColor: '#eee',
      font: 'inherit',
      border: '1px solid #999',
      padding: '8px 18px',
      cursor: 'pointer'
    }
    return (
      <div className="App">
        <h1>Welcome to React</h1>
        <button style={personStyle} onClick={() => this.switchNameHandler('Jae Yeun Moon !!!')}>Switch Name</button> {/* this can be used but not recommended */}
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age} 
          changed={this.nameChangedHandler}
          click={this.switchNameHandler.bind(this, 'Max !!!')} > My Hobbies: Racing </Person> {/* bind is recommended */}
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
        {/* <Person name="Max" age="25"><span>My Hobbies: <span>Racing</span></span></Person>
        <Person name="Stephanie" age="24" /> */}
      </div>
    );
    // Behind JSX... Real React doing.....
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null ,'Welcome to React'));
  }
}

export default App;
