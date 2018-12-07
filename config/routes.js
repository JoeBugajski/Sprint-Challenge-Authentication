const secretHidingPlace = require('../_secrets/keys');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const db = require('../database/dbConfig');


const { authenticate } = require('./middlewares');

module.exports = server => {
  server.use(logger('combined'));
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const secret = secretHidingPlace.jwtKey;

function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345'
  }
  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 12);
  creds.password = hash;
  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      // find the user using the id
      db('users')
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res
            .status(201)
            .json({ id: user.id, token })
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
};

function login(req, res) {
  // implement user login
  const creds = req.body;
  db('users')
    .where({
        username: creds.username
      })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user); // generate a token
        // attach that token to the response
        res
          .status(200)
          .json({
            message: `Welcome ${user.username}`,
            token
          })
      } else {
        res
          .status(401)
          .json({
            message: "You shall not pass!!"
          });
      }
    })
    .catch(err => res
                    .status(500)
                    .json({
                      errorMessage: "Sorry, we had some trouble logging you in", 
                      err
                    }));
};

function getJokes(req, res) {
  axios
    .get('https://safe-falls-22549.herokuapp.com/random_ten')
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
