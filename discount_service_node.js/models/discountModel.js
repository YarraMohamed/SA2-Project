const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({



discount:{
    type :String,
    required:true,
}
,
BeginDiscount:{
    type : String,
    required:true,
},
endDiscount:{
    type : String,
    required:true,
}


})
module.exports= mongoose.model('Discount',discountSchema)