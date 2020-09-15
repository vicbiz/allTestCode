import React, { Component } from 'react';
import Proptypes from 'prop-types';

const propTypes = {
  title: Proptypes.string,
  name: Proptypes.string.isRequired,
}

const defaultProps = {
  title: "Default Title",
  name: "Default Name",
}

class ListComponent extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      renderSubtitle : true,
      subTitle : "This is Initial Subtitle",
      checked : false,
      inputValue : "Initial Input Value"
    };

    this.updateSubTitle = this.updateSubTitle.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  // **********************************************************************************

  componentWillMount(){
    // good place to get AJAX
    console.log("WILL MOUNT COMPONENT");
  }

  componentDidMount(){
    console.log("DID MOUNT COMPONENT");
  }

  componentWillUpdate( nextProps, nextState ){
    console.log("WILL UPDATE COMPONENT", this.props, this.state, nextProps, nextState);
  }

  componentDidUpdate( prevProps, prevState ){
    console.log("DID UPDATE COMPONENT", this.props, this.state, prevProps, prevState);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // return false; // STOP UPDATE
    return true;
  }
  

  // **********************************************************************************

  updateSubTitle(){
    this.setState({
      subTitle: "New Subtitle"
    })
  }

  updateInput(e){
    this.setState({
      inputValue: e.target.value 
    })
  }

  updateCheckbox(e){
    this.setState({
      checked: !this.state.checked
    });
  }

  renderSubtitle(){
    if(this.state.renderSubtitle){
      return <h4> {this.state.subTitle} </h4>
    } else {
      return null;
    }
  }




  render(){
    const {title, name} = this.props;
    return (
      <div>
        <h3> {title} by {name} </h3>
        { this.renderSubtitle() }
        <ul>
          <li>List 001</li>
          <li>List 002</li>
          <li>List 003</li>
          <li>List 004</li>
          <li>List 005</li>
        </ul>
        <button onClick={this.updateSubTitle}>Click Me</button>
        <div>
          <input type="checkbox" onChange={this.updateCheckbox} checked={this.state.checked} />
          <input onChange={this.updateInput} value={this.state.inputValue} />
        </div>
      </div>
    );
  }
}

ListComponent.propTypes = propTypes;
ListComponent.defaultProps = defaultProps;

export default ListComponent;
