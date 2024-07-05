let express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();

const registrationSchema = Joi.object({
  user_name: Joi.string().required(),
  password: Joi.string().min(5).required(),
});

router.post("/", async (request, response, next) => {
  try {
    let registrationData = request.body;
    const { error } = registrationSchema.validate(registrationData);
    if (error) {
      throw new Error();
    }
    // Sign a JWT token
    const token = jwt.sign(registrationData, process.env.JWT_SECRET, { expiresIn: "2h" });
    
    response.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
