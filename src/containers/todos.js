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
  updateToDo,
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
      signal: 0,
      show: false,
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
  //to take the state value of a to do
  componentDidUpdate() {
    console.log('')
  }
  // to prevent the button default action 
  prevent(e) {
    e.preventDefault();
  }
  //to add a todo
  addButton(e) {
    this.prevent(e);
    this.showModal()
  }
  //to edit a todo
  editButton(e, i) {
    this.prevent(e);
    this.setState({
      signal: i,
      show: true,
      description: this.props.reducerApp.todos[i].description,
    }, () => {
      this.showModal()
    })
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
  handleState(check, i, e) {
    this.props.updateToDoState(
      this.props.reducerApp.todos[i].id,
      check,
      this.props.reducerApp.token
    )
    this.setState({
      done: !this.state.done
    })
  }
  //to create the todo buttons for edit and delete
  createButtons(i) {
    return (
      <ButtonGroup>
        <Button
          onClick={e => this.editButton(e, i)}>
          <Icon type="edit" />
        </Button>
        <Button type="danger"
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
  //show the modal when his state is true
  showModal() {
    this.setState({
      visible: true,
    });
  }
  //call the createToDo or updateToDo action depending of the show value from the state
  handleOk() {
    this.setState({
      description: '',
      confirmLoading: true
    });
    if (this.state.show) {
      console.log('va a actualizar el registro:', this.state.signal)
      this.props.updateToDo(
        this.props.reducerApp.todos[this.state.signal].id,
        this.state.description,
        this.props.reducerApp.todos[this.state.signal].done,
        this.state.done
      )
    } else {
      this.props.createToDo(
        this.state.description,
        this.props.reducerApp.token
      )
    }
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
      show: false
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
          onOk={this.state.description !== '' ? this.handleOk : this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <h2>Description</h2>
          <input
            className="inputs"
            type="text"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <br />
          {this.state.show &&
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked={this.props.reducerApp.todos[this.state.signal].done}
              onClick={(check) => this.handleState(check, this.state.signal)}
            />
          }
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
        <div className="footer">
          <a href="https://github.com/jhudaz" target="new_blank
          ">Jaime Andres Velez Rojas</a>
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
    updateToDo,
    logOut
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDos);
