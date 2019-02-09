import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { } from '../actions';

import '../App.scss';

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <h2>Email</h2>
          <input
            className="inputs"
            type="email"
            onChange={() => console.log()} />
          <h2>Password</h2>
          <input
            className="inputs"
            type="password"
            onChange={() => console.log()} />
          <br />
          <button
            className="signIn green"
            onClick={() => console.log()}>
            Sign In
          </button>

        </form>
      </div>
    );
  }
}
//reduceras
function mapStateToProps({ }) {
  return {

  }
}
//actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
