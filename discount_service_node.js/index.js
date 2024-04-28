const express = require("express");

const app = express();

const mongoose = require("mongoose");

app.use(express.json());
const discountRouter = require('./Routes/discountRoutes')

const apiPort = 6003;


mongoose.connect('mongodb://discount_db:27017/data',  { useNewUrlParser: true }).then(()=>{
  console.log('mongodb connected successfully');
})


app.use('/api/discount',discountRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
