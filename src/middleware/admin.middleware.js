const Joi = require('joi');
exports.adminValidation = (req, res, next) => {
    const validateUser = (user) => {
      const JoiSchema = Joi.object({
        email: Joi.string().email(),
        phone: Joi.number(),
        password: Joi.string().required()
      }).or("phone", "email");
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
}