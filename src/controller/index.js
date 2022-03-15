const {sellerVarified,signUPSeller,sellerLogin,verifiedOtp,createAccessRefreshToken} = require('./seller.controller')
const{verifiedByAdmin,adminLogin} =  require('./admin.controller')

module.exports = {
    sellerVarified,
    signUPSeller,
    sellerLogin,
    verifiedOtp,
    verifiedByAdmin,
    adminLogin,
    createAccessRefreshToken
}