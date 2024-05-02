const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");


const app = express();
const apiPort = 6003;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const discountRouter = require('./Routes/discountRoutes')

mongoose.connect('mongodb://discount_db:27017/data',  { useNewUrlParser: true }).then(()=>{
  console.log('mongodb connected successfully');
})

app.use('/api/discount',discountRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
