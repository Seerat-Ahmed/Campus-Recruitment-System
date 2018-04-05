import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../store/action/counter';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h3>Campus Recruitment System</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counting: state.counter,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
