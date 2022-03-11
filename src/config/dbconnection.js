const mongoose = require('mongoose')


module.exports = {
    connection:()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/e-coomerece")
    .then((data)=>{
        console.log("db connect successfully :)")
    }).catch((error)=>{
        console.log(error)
    })
}
}