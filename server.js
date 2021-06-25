"use strict";
const express = require("express");
const server = express();

const cors = require("cors");
const axios = require("axios");
server.use(cors());

require("dotenv").config();
server.use(express.json());
const mongoose=require('mongoose');

const PORT = process.env.PORT;

//mongodb://AbdullahElian:na38$hmt@cluster0-shard-00-00.jt3gb.mongodb.net:27017,cluster0-shard-00-01.jt3gb.mongodb.net:27017,cluster0-shard-00-02.jt3gb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-upuefu-shard-0&authSource=admin&retryWrites=true&w=majority

//mongodb+srv://AbdullahElian:na38$hmt@cluster0.xtrut.mongodb.net/<dbname>?retryWrites=true&w=majority

let keyAtlas=process.env.ATLAS;

// mongoose.connect('locallhost:27017/project',{useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// })

mongoose.connect(keyAtlas, { useNewUrlParser: true, useUnifiedTopology: true });

const photoSchema=mongoose.Schema({
  title:String,
  description:String,
  url:String,
})

const usrSchema=mongoose.Schema({
  email:String,
  photo:[photoSchema],
})

const photoModel=mongoose.model('photo',photoSchema);
const userModel=mongoose.model('user',usrSchema);


function createUser(email){
  const user1=new userModel({
    email:'abodelian28@gmail.com',
    photo:[
      {
      title:'london',
      description:'city name london',
      url:'https://tse1.mm.bing.net/th?id=OIP.yHGzPTZEv2KCXcsrSN8FdQHaEK&pid=Api&P=0&w=283&h=160'
      }


    ]
  })
  user1.save();
}

// createUser();

//http://localhost:3010/addphoto?
server.post('/addphoto', addPhoto);

function addPhoto(req,res){

  let {title,des,imgUrl,email}=req.body;
  console.log(req.body);

  userModel.find({email:email},function(err,photoData){
    console.log('inside');
      if(err){
          res.send(err);
      }
      else
      {
          // console.log(userData[0].books);
          
          photoData[0].photo.push({
              title,
              description:des,
              url:imgUrl

          })
          photoData[0].save();
          res.send(photoData[0].photo);
          
      }
  })
  // console.log(req.body);
  
}
http://localhost:3010/getphoto?email=
server.get('/getphoto', photoHandler)

function photoHandler(req,res){
  let email=req.query.email;
  // console.log(email);

  userModel.find({email:email},function(err,photoData){
      if(err){
          res.send(err);
      }
      else
      {
          
          res.send(photoData[0].photo);
          
      }
  })

}




//http://localhost:3010/
server.get("/", (req, res) => {
  res.send("Home Route");
});

//localhost:3010/photo?photoName=london
server.get("/photo", (req, res) => {
  let photo = req.query.photoName;
  let url = `https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=4u4HKTmiuGGTg3IPDuRj6BLWguZI-IvdfcHk2Uy6Tww`;
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
