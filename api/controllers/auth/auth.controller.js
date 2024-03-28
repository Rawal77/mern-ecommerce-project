const { showError } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

class AuthController {
  register = async (req, res, next) => {
    try {
      const { name, email, password, confirm_password, phone, address } =
        req.body;
      if (await User.findOne({ email })) {
        next({
          status: 422,
          message: `Email Aleady Exist`,
        });
      } else {
        if (password === confirm_password) {
          const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
          await User.create({ name, address, email, phone, password: hash });
          res.json({
            success: `Thank you for registering plz login to continue`,
          });
        } else {
          next({
            status: 422,
            message: `Password doesnot match`,
          });
        }
      }
    } catch (error) {
      showError(error, next);
    }
  };
  login = async (req, res, next) => {};
}

module.exports = new AuthController();
