const discountSchema = require('../models/discountModel')


const getDiscount =async (req ,res )=>{
    const discont  = await discountSchema.find({});
    res.json({status:'success', code:500, data:discont})
}

const createDiscount =async (req ,res)=>{
    const { discount, BeginDiscount , endDiscount } = req.body;
    const newDiscount = new discountSchema({
        discount,
        BeginDiscount,
        endDiscount
    })
    
    await newDiscount.save();
    res.json({status:'success',data:{newDiscount},msg:'discount successfully added'})

}

const deleteDiscount =async (req ,res)=>{
    const id = req.params.id;
    await discountSchema.deleteOne({_id: id})
    res.json({status:'success',msg:'Discount deleted successfully'})
}

module.exports = {
    getDiscount,
    createDiscount,
    deleteDiscount
}