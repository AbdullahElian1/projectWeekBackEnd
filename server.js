'use strict'
const express =require('express');
const server=express();

const cors=require('cors');
const axios=require('axios');
server.use(cors());

require("dotenv").config();

const PORT=process.env.PORT;


//http://localhost:3010/
server.get('/',(req,res)=>{
    res.send('Home Route');
});



//localhost:3010/photo?photoName=london
server.get('/photo',(req,res)=>{
    let photo=req.query.photoName;
    console.log(photo);
    let url=`https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=4u4HKTmiuGGTg3IPDuRj6BLWguZI-IvdfcHk2Uy6Tww`;
    axios.get(url).then(result =>{
        const photoArray = result.data.results.map(item=>{
             return new photo1 (item);
    })
})
   
})

class photo1 {
    constructor(item) {
       
        
        this.imagel=item.urls.full;
        this.description=item.description;
        // this.location=item.location;


    }
}



server.listen(process.env.PORT || 3010, () => {
    console.log(`im here ${PORT}`);
});