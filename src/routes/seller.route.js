const express = require('express');
const { route } = require('express/lib/application');
const router = express();
const {sellerVarified,sellerLogin,verifiedOtp} = require('../controller/')
const { signUpSellerValidation} = require('../middleware/')
const{verifiedByAdmin} = require('../controller/')


router.post('/varifiedotp',verifiedOtp);
router.post('/login',signUpSellerValidation,sellerLogin);
router.get('/:token', sellerVarified)
router.post('/admin',verifiedByAdmin)

module.exports = router