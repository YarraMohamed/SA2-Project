const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({



discount:{
    type :String,
    required:true,
}
,
BeginDiscount:{
    type : Number,
    required:true,
},
endDiscount:{
    type : Number,
    required:true,
}


})
module.exports= mongoose.model('Discount',discountSchema)