import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {  getUser, getToDos, logOut } from '../actions';
import '../App.scss';

class ToDos extends Component {
  constructor(props) {
    super(props)
    this.prevent = this.prevent.bind(this);
    this.logOutButton = this.logOutButton.bind(this);
    this.createList = this.createList.bind(this);
  }

  componentDidMount(){
    this.props.getUser(this.props.reducerApp.token)
  }
  // to prevent the button default action 
  prevent(e) {
    e.preventDefault()
  }
  //to clear the state of redux and log out
  logOutButton(e) {
    this.prevent(e);
    this.props.logOut();
    this.props.history.push('/')
  }
  createList(todos,i){
    return(
      <li index={i}>
        <div>
          <ul>
            <li>{todos.description}</li>
          </ul>
        </div>
      </li>
    )
  }
  render() {
    return (
      <div>
        <h1>To DO...</h1>
        <hr/>
        <button
          className="add green"
          onClick={ e => console.log()}>
          Add
        </button>
        <ul>
          {this.props.reducerApp.todos.map((e, i)=> this.createList(e,i))}
        </ul>
        <button
          className="logOut red"
          onClick={e => this.logOutButton(e)}>
          Log Out
        </button>
      </div>
    );
  }
}
//reducers
function mapStateToProps({ reducerApp }) {
  return {
    reducerApp
  }
}
//actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser,
    getToDos,
    logOut
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDos);
