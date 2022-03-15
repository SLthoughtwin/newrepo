const express = require('express');
const router = express();
const { adminValidation } = require('./../middleware/');
const { adminLogin ,verifiedByAdmin} = require('./../controller/')
const { accessTokenVarify } = require('./../middleware/')



router.post('/login', adminValidation,adminLogin)
router.post('/verify',accessTokenVarify,verifiedByAdmin)


module.exports = router