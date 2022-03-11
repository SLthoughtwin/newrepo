const {sellerVarified,signUPSeller,sellerLogin,verifiedOtp} = require('./seller.controller')
const{verifiedByAdmin} =  require('./admin.controller')

module.exports = {
    sellerVarified,
    signUPSeller,
    sellerLogin,
    verifiedOtp,
    verifiedByAdmin
}