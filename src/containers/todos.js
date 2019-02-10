import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Icon, Modal } from 'antd';

import {
  getUser,
  getToDos,
  updateToDoState,
  logOut
} from '../actions';

import '../App.scss';

class ToDos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false,
      visible: false,
      confirmLoading: false
    }
    this.prevent = this.prevent.bind(this);
    this.logOutButton = this.logOutButton.bind(this);
    this.createList = this.createList.bind(this);
    this.handleState = this.handleState.bind(this);
    this.createButtons = this.createButtons.bind(this);
    this.addButton = this.addButton.bind(this);
    //MODAL
    this.showModal = this.showModal.bind(this);
    this.handleOk = this. handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }
  //to load the user data and pass it to the store
  componentDidMount() {
    this.props.getUser(this.props.reducerApp.token);
  }
  // to prevent the button default action 
  prevent(e) {
    e.preventDefault();
  }
  addButton(e) {
    this.prevent(e);
    this.showModal(e)
  }
  //to clear the state of redux and log out
  logOutButton(e) {
    this.prevent(e);
    this.props.logOut();
    this.props.history.push('/')
  }
  //to handle the  update of todo state 
  handleState(check, i) {
    this.props.updateToDoState(
      this.props.reducerApp.todos[i].id,
      check,
      this.props.reducerApp.token
    )
  }
  //to create the todo buttons for edit and delete
  createButtons() {
    return (
      <div>
        <button
          className="yellow">
          <Icon type="edit" />
        </button>
        <button
          className="red">
          <Icon type="close" />
        </button>
      </div>
    )
  }
  //to create the todos list
  createList(todos, i) {
    return (
      <li index={i}>
        <div>
          <ul className="list">
            <li>{this.createButtons()}</li>
            <li>{todos.description}</li>
            <li>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                defaultChecked={this.props.reducerApp.todos[i].done}
                onClick={(check) => this.handleState(check, i)}
              />
            </li>
          </ul>
        </div>
      </li>
    )
  }
  //MODAL

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <h2>Description</h2>
          <input
            className='inputs'
            type="text"
            onChange={() => console.log()}
          />
        </Modal>
        <h1>{this.props.reducerApp.user.name}</h1>
        <hr />
        <button
          className="add green"
          onClick={e => this.addButton(e)}>
          Add
        </button>
        <ul >
          {this.props.reducerApp.todos.map((e, i) => this.createList(e, i))}
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
    updateToDoState,
    logOut
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDos);
