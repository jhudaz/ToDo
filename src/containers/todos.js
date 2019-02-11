import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Icon, Modal, Menu, Button } from 'antd';

import {
  getUser,
  getToDos,
  updateToDoState,
  createToDo,
  deleteToDo,
  logOut
} from '../actions';

import '../App.scss';

const ButtonGroup = Button.Group;

class ToDos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false,
      description: '',
      signal: '',
      visible: false,
      confirmLoading: false,
      current: 'mail',
    }
    this.prevent = this.prevent.bind(this);
    this.logOutButton = this.logOutButton.bind(this);
    this.createList = this.createList.bind(this);
    this.handleState = this.handleState.bind(this);
    this.createButtons = this.createButtons.bind(this);
    this.addButton = this.addButton.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    //MODAL
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
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
  //to add a todo
  addButton(e) {
    this.prevent(e);
    this.showModal(e)
  }
  editButton(e, i) {
    this.prevent(e);
  }
  //to delete a todo
  deleteButton(e, i) {
    this.prevent(e);
    this.props.deleteToDo(
      this.props.reducerApp.todos[i].id,
      this.props.reducerApp.token
    )
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
  createButtons(i) {
    return (
      <ButtonGroup>
        <Button
          onClick={e => this.editButton(e, i)}>
          <Icon type="edit" />
        </Button>
        <Button
          onClick={e => this.deleteButton(e, i)}>
          <Icon type="close" />
        </Button>
      </ButtonGroup>
    )
  }
  //to create the todos list
  createList(todos, i) {
    return (
      <li key={i}>
        <div>
          <ul className="list">
            <li>{this.createButtons(i)}</li>
            <li>{todos.description}</li>
            <li>
              {/*ant design component for the todo state*/}
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
  //show the modal whenhis state is true
  showModal() {
    this.setState({
      visible: true,
    });
  }
  //call the createToDo action
  handleOk() {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      description: '',
      confirmLoading: true
    });
    this.props.createToDo(
      this.state.description,
      this.props.reducerApp.token
    )
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  //close the modal
  handleCancel() {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          mode="horizontal">
          <Menu.Item className="userName">
            <h1 className="user"><Icon className="userIcon" type="user" />{this.props.reducerApp.user.name}</h1>
          </Menu.Item>
          <Menu.Item key="alipay">
            <button
              className="logOut red"
              onClick={e => this.logOutButton(e)}>
              Log Out
            </button>
          </Menu.Item>
        </Menu>
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
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })} />
        </Modal>
        <form className="component">
          <Button
            className="add green"
            type="primary"
            onClick={e => this.addButton(e)}>
            Add
          </Button>
          <ul >
            {this.props.reducerApp.todos.map((e, i) => this.createList(e, i))}
          </ul>
        </form>
        <div class="footer">
          <p>Jaime Andres Velez Rojas </p>
          <a href="https://github.com/jhudaz">Github Profile!</a>
        </div>
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
    createToDo,
    deleteToDo,
    logOut
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDos);
