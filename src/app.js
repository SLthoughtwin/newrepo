const express = require ('express');
const {port,connection} = require('./config/index')
const { adminRoute } = require('./routes/')
const { sellerRoute} = require('./routes/')

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use("/admin", adminRoute);
app.use("/seller",sellerRoute)



app.listen(port,()=>{
 console.log(`connection successfull ${port}`)
 connection();
})