<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
  The server creates a small piece of data (cookie) to be stored on the user's browser, to persist authentication without needing to log back in. The user sends their cookie back to the server when they make a request, and if that coookie checks out then that use is valid. 
2. What does bcrypt do to help us store passwords in a secure manner.
  Instead of saving the actual password, you save a "hash" of that password, which basically runs your password through an algorithm a certain amount of times that returns a hashed version of your password. In order to de-hash your password, they'd need to know which algorithm was used and how many times that algorithm was used. This becomes even more difficult if the password you start with before hashing is a long string of random characters, instead of recognizable words. A hacker can basically run every algorithm lots of times until a real word emerges, which will likely be the password. But if you don't use a real word, this will not work.
3. What does bcrypt do to slow down attackers?
  See above answer.
4. What are the three parts of the JSON Web Token?
  Header, Payload and signature.