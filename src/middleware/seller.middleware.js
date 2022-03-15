const Joi = require('joi');
const { asscesstoken,refreshtoken} = require("../config/");
const jwt = require('jsonwebtoken');

exports.signUpSellerValidation = (req, res, next) => {
    const validateUser = (user) => {
      const JoiSchema = Joi.object({
        name: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        phone: Joi.number(),
        address: Joi.string(),
        login: Joi.string(),
        role:Joi.string(),
        password: Joi.string().required()
      }).or('email','phone');
      return JoiSchema.validate(user);
    };

    const response = validateUser(req.body);
    if (response.error) {
      res.status(400).json({
        message: response.error.details[0].message,
        status: 400,
        success: false,
      });
    } else {
      next();
    }
},

exports.loginsellerValidation = (req, res, next) => {
  const loginUser = (user) => {
    const JoiSchema = Joi.object({
      login: Joi.string().required(),
    //   email: Joi.string().email().min(5).max(50).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    }).options({ abortEarly: false });
    return JoiSchema.validate(user);
  };
  const response = loginUser(req.body);
  if (response.error) {
    res.status(400).json({
      message: response.error.details[0].message,
      status: 400,
      success: false,
    });
  } else {
    next();
  }
}



exports.accessTokenVarify =  (req, res, next) => {
  const token = req.headers.authorization;
  // const token = req.params.token
  if (!token) {
    return res.status(400).json({
      message: "A token is required for authentication",
      status: 400,
      success: false,
    });
  } else {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    jwt.verify(
      token,asscesstoken,
      (error, payload) => {
        if (error) {
          res.status(400).json({
            message: "invalid token",
            status: 400,
            success: false,
          });
        } else {
          next();
        }
      }
    );
  }
}

