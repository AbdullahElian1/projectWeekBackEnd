"use strict";
const express = require("express");
const server = express();

const cors = require("cors");
const axios = require("axios");
server.use(cors());

require("dotenv").config();
server.use(express.json());


const PORT = process.env.PORT;



const{
  addPhoto,
    photoHandler,
    createUser,
    deletePhoto
}=require('./module/dbForHomeAndMyPhoto');

// createUser();

////http://localhost:3010/deletephoto?email

// server.delete('/deletephoto/:index',deletephoto)

////http://localhost:3010/deletephoto?email

server.delete('/deletephoto/:index', deletePhoto);




//http://localhost:3010/addphoto?
server.post('/addphoto', addPhoto);


//http://localhost:3010/getphoto?email=
server.get('/getphoto', photoHandler)






//http://localhost:3010/
server.get("/", (req, res) => {
  res.send("Home Route");
});

function getRandomIntInclusive() {
  let min =1
  let max = 20
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//localhost:3010/photo?photoName=london
server.get("/photo", (req, res) => {
  let photo = req.query.photoName;
  let pageNumber=getRandomIntInclusive();
  let url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${photo}&per_page=12&client_id=4u4HKTmiuGGTg3IPDuRj6BLWguZI-IvdfcHk2Uy6Tww`;
  axios.get(url).then((result) => {
    const photoArray = result.data.results.map((item) => {
      return new photo1(item);
    });

    res.send(photoArray);
  });
});

class photo1 {
  constructor(item) {
    this.imagel = item.urls.full;
    this.description = item.description;
    this.title = item.tags[1].title;
  }
}

server.listen(process.env.PORT || 3010, () => {
  console.log(`im here ${PORT}`);
});
