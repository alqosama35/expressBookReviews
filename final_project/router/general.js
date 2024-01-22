const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here--
  const username= req.body.username;
  const password=req.body.password;
  if(username || password){
    if(!usernameExist(username))
    {
         
    }
  }
  else{
    return res.status(400).json("enter a valid username and password");
  }

  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here--

  return res.status(200).json(JSON.stringify(books,null,5));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here---
  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here--
  const author = req.params.author;
  let book = Object.values(books).find(b =>b.author == author)
  if(book)
  return res.status(200).json(book);
  else return res.status(300).json("i can't find the author's book");
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here--

  const title = req.params.title;
  let book = Object.values(books).find(b =>b.title == title)
  if(book)
  return res.status(200).json(book);
  else return res.status(300).json
  ("i can't find the author's book");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here--
  const isbn = req.params.isbn;
  if(isbn){
    return res.status(200).json(books[isbn].reviews)
  }
  else return res.status(300).json("This isbn not found")
  
});

module.exports.general = public_users;
