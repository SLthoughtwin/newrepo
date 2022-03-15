const express = require('express');
const { route } = require('express/lib/application');
const router = express();
const {sellerVarified,sellerLogin,verifiedOtp,createAccessRefreshToken} = require('../controller/')
const { signUpSellerValidation} = require('../middleware/')



router.post('/varifiedotp',verifiedOtp);
router.post('/login',signUpSellerValidation,sellerLogin);
router.get('/:token',sellerVarified)
router.post('/createNewPairOfToken',createAccessRefreshToken)

module.exports = router