const {
  signUpSellerValidation,
  loginsellerValidation,
  accessTokenVarify,
  adderssValidation,
  profileValidation,
  productValidation,
  checkRole,
  uploadfile,
  uploadImage,
  deleteImageFromCloud,
  checkFilter,
  productUpdateValidation
} = require('./seller.middleware');
const { adminValidation,categoryValidation,brandValidation } = require('./admin.middleware');

module.exports = {
  signUpSellerValidation,
  loginsellerValidation,
  adminValidation,
  accessTokenVarify,
  adderssValidation,
  profileValidation,
  productValidation,
  checkRole,
  uploadfile,
  uploadImage,
  deleteImageFromCloud,
  checkFilter,
  productUpdateValidation,
  categoryValidation,
  brandValidation
};
