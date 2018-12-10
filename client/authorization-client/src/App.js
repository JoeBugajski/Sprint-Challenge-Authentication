import React, { Component } from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Jokes from './jokes/Jokes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = [
      
    ];
  }
  render() {
    return (
      <div className="App">
          <Route path='/jokes' component={Jokes}/>
          <header className="App-header">
            <div className="navLinks">
              <NavLink to='/jokes'>
                <h1>Dad Jokes</h1>
              </NavLink>
              <NavLink to="/login">
                <h1>Login</h1>
              </NavLink>
              <NavLink to='/register'>
                <h1>Sign Up</h1>
              </NavLink>
              <button onClick={this.logout}>Logout</button>
              <Route path="/login" component={Login}/>
              <Route path='/register' component={Register}/>
            </div>
        </header>
      </div>
    );
  }
  logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('./')
 }
}

export default withRouter(App);
