const jwt = require("jsonwebtoken");
const { User } = require("../models");

const auth = async (req, res, next) => {
  if ("authorization" in req.headers) {
    const token = req.headers.authorization.split(" ").pop();
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const uid = decoded.id;
      const user = await User.findById(uid);
      if (user) {
        (req.uid = uid), (req.user = user);
        next();
      } else {
        next({
          status: 401,
          message: "Token invalid",
        });
      }
    } catch (error) {
      next({
        message: "Token invalid",
        status: 401,
      });
    }
  } else {
    next({
      status: 401,
      message: `Token Missing`,
    });
  }
};

const cms = (req, res, next) => {
  if (req.user.type !== "Customer") {
    next();
  } else {
    next({
      status: 403,
      message: "Access denied",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.type === "Admin") {
    next();
  } else {
    next({
      status: 403,
      message: "Access Denied",
    });
  }
};

module.exports = { auth, cms, adminOnly };
