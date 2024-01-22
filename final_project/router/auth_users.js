const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here--
  const username= req.body.username;
  const password = req.body.password;
  
  if(username && password)
  {
    if(authenticatedUser(username,password))
    {
        let accessToken = jwt.sign({
          data: password
         }, 'access', { expiresIn: 60 * 60 });
         req.session.authorization = {
            accessToken,username
    }
    return res.status(200).json("sign in success");
    }
    else return res.status(208).json("your username or password in wrong")

  }
  else return res.status(400).json("enter a valid username and password");
  
});
//check user has reviewed befor or not
const userReviewed= (username)=>{
    let userIn=books[isbn].review.filter((user)=>{
        return username === user;
    })
    if (userIn.length>0)
    {
        return true;
    }
    else return false;
}
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here---
  const isbn = req.params.isbn;
  const review= req.query.review;
  if(review)
  {
    if(userReviewed(username))
    {
        books[isbn].review[username]= review;
    }
    else{
        books[isbn].review.push({username:review})

    }

  }
  else return res.status(400).json("enter valid review")
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
