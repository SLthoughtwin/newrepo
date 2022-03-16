const express = require ('express');
const winston = require('winston');
const {port,connection} = require('./config/index')
const { adminRoute } = require('./routes/')
const { sellerRoute} = require('./routes/')
const {logger} = require('./shared/')

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use("/admin", adminRoute);
app.use("/seller",sellerRoute)



app.listen(port,()=>{
    logger.info(`connection successfull ${port}`)
   connection();
})