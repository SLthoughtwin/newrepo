const express = require ('express');
const {port,connection} = require('./config/index')
const { sellerRoute} = require('./routes/')

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// app.use("/user", userRoute);
app.use("/seller",sellerRoute)



app.listen(port,()=>{
 console.log(`connection successfull ${port}`)
 connection();
})