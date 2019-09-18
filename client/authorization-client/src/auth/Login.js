import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  render() {
    return (
      <form 
        className = 'form'
        onSubmit={this.register}>
        <div className='inputs'>
          <label>Dad Name:</label>
            <input 
              name = "username"
              value={this.state.username}
              type="text"
              onChange={this.handleChange} />
        </div>
        <div className ='inputs'>
          <label>Password:</label>
          <input 
            name= "password"
            value={this.state.password}
            type="password"
            onChange={this.handleChange} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
  register = event => {
    event.preventDefault();
    axios
      .post('http://localhost:5200/api/login', this.state)
      .then(res => {
      console.log(res.data);
      localStorage.setItem('jwt', res.data.token);
      this.props.history.push('/jokes');
    })
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }
}


export default Login;