const express = require('express');
const router =express.Router();
const discountContoller = require('../controller/discountController')

router.route('/')
    .get(discountContoller.getDiscount)
    .post(discountContoller.createDiscount)

    router.route('/:id')

    .delete(discountContoller.deleteDiscount)



module.exports = router;