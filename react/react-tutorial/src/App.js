import React, { Component } from 'react';
import ListComponent from './components/ListComponent';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      description : "This is ReactJS Testing by Jae Moon"
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
  }


  onSubmitForm(e){
    e.preventDefault();
    console.log(e.target);
    console.log(this.inputField.value);

    this.setState({
      description : "Form Submitted, Thank you~!"
    });
  }

  onInputChange(e){
    console.log(e.target.value)
  }

  onClickAlert(clickedObj){
    console.log("clicked");
    console.log("clickedObj ", clickedObj);
    console.log("clickedObj.target ", clickedObj.target);
    console.log("clickedObj.target.innerHTML ", clickedObj.target.innerHTML);
    console.log("clickedObj.currentTarget ", clickedObj.currentTarget);
    console.log("clickedObj.currentTarget.innerHTML ", clickedObj.currentTarget.innerHTML);
  }

  render() {
    const title1 = "Welcome to Jae's React Testing";
    const title2 = "Welcome to React Testing";
    const flag = true;

    const list = [
      'item 1',
      'item 2',
      'item 3',
      'item 4'
    ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            { flag === true ? title1 : title2 }
          </h1>
        </header>
        <div>
          <h2>{this.state.description}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          list : { list.map( listItem => listItem + " " )}
          <ul>
            { list.map( (listItem, i) => {
              return(
                // <li onClick={ this.onClickAlert.bind(this) } key={i}>{i} - {listItem}</li>
                <li onClick={ this.onClickAlert } key={i}>{i} - {listItem}</li>
              );
            }) }  
          </ul>
          <form onSubmit={this.onSubmitForm}>
            <input onChange={this.onInputChange} ref={ inputField => this.inputField = inputField }/>
          </form>
        </div>

        <div>
          {/* <ListComponent title={2} name="Jae Moon" />
          <ListComponent />
          <ListComponent name="Jae Moon" /> */}
          <ListComponent title={"This is List Component Title"} name="Jae Moon" />
        </div>

      </div>
    );
  }
}

export default App;
