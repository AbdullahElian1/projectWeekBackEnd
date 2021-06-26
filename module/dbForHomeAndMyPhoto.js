'use strict'

module.exports={
    addPhoto,
    photoHandler,
    createUser,
    deletephoto

}
let keyAtlas=process.env.ATLAS;
const mongoose=require('mongoose');

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


  //this methode to store the picture that choosen by the user in the database 

//http://localhost:3010/addphoto?
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

  //this methode to return photo in my photo component
//http://localhost:3010/getphoto?email=
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

  function deletephoto(req,res){
    console.log('abdullah');
    const {email} = req.query;
    const index=Number(req.params.index);
    console.log(email,index);
    userModel.find({email:email},(err,photoData)=>{
      if(err){
        
        console.log('wrong');
      }
      else{
        const newPhotoArr=photoData[0].photo.filter((photo,i)=>{
          if(index!==i){
            return photo;
          }
        });
        photoData[0].photo=newPhotoArr;
        photoData[0].save;
        console.log(photoData[0]);

        res.send(photoData[0].photo);
      }
  
    });
  }