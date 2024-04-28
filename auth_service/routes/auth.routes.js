const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post("/register",authController.register
);

router.post("/login", authController.login
);

// router.put("/logout", 
//     authorized,
//     authController.logout
// );

module.exports = router;
