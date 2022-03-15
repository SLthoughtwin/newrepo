const { signUpSellerValidation ,loginsellerValidation,accessTokenVarify} = require('./seller.middleware')
const { adminValidation } = require('./admin.middleware')

module.exports = {
    signUpSellerValidation,
    loginsellerValidation,
    adminValidation,
    accessTokenVarify
}