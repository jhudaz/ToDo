import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authenticate } from '../actions';

import '../App.scss';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this);
  }
  //if the backend response is a success redirect to the todo component
  componentDidUpdate() {
    if (this.props.reducerApp.success) {
      this.props.history.push('/ToDos');
    } 
  }
  //to prevent the default action of the sign in button  and call the action  
  login(e) {
    e.preventDefault()
    this.props.authenticate(
      this.state.email,
      this.state.password
    )
  }
  render() {
    return (
      <div>
        <form>
          <h2>Email</h2>
          <input
            className="inputs"
            type="email"
            placeholder="example@example.com"
            onChange={e => this.setState({ email: e.target.value })} />
          <h2>Password</h2>
          <input
            className="inputs"
            type="password"
            placeholder="password"
            onChange={e => this.setState({ password: e.target.value })} />
          <br />
          <button
            className="signIn green"
            onClick={e => this.login(e)}>
            Sign In
          </button>

        </form>
      </div>
    );
  }
}
//reduceras
function mapStateToProps({ reducerApp }) {
  return {
    reducerApp
  }
}
//actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    authenticate
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
