const mongoose = require('mongoose');

async function connectDB(){
    
    await mongoose.connect("mongodb+srv://SandeepPatil:mFKa9pCSeE8x0GnT@posts.ykeacge.mongodb.net/posts");

    console.log("Database Connected Successfully ");
    
}

module.exports=connectDB;