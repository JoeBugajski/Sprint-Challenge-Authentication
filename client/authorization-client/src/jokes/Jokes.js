import React, { Component } from 'react';
import axios from 'axios';
import './jokes.css';
import dad1 from './dads/dad1.jpg';
import dad2 from './dads/dad2.jpg';
import dad3 from './dads/dad3.jpg';
import dad4 from './dads/dad4.jpeg';
import dad5 from './dads/dad5.jpg';
import dad6 from './dads/dad6.jpg';
import dannyTanner from './dads/dannyTanner.jpg';
import dannyTannerGif from './dads/dannyTanner.gif';
const dads =[
  dad1,
  dad2,
  dad3,
  dad4,
  dad5,
  dad6,
  dannyTanner
]


class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
    };
  }

    
  render() {
    return (
      <div className='jokeCards'>
        
        <h1>Infinite Dad Joke Generator!</h1>
          {this.state.jokes.map(joke =>
            <div key={joke.id} className='jokeCard'>
              <div className='imageContainer'>
                  <img 
                    src={dads[Math.floor(Math.random()*dads.length)]}
                    alt='dad' />
              </div>
              <div className='jokeContainer'>
                  <h3>Q: {joke.setup}</h3>
                  <p>A: {joke.punchline}</p>
              </div>
            </div>
            )
          }
        <img className='danny'src={dannyTannerGif} alt='Danny Tanner'/>
      </div>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const reqOptions = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get('http://localhost:3400/api/jokes', reqOptions)
      .then(res => {
        console.log(res.data);
        this.setState({
          jokes: res.data
        })
      })
      .catch(err => {
        console.error('Axios Error', err);
        this.props.history.push('/login');
      });
  }
}


export default Jokes;