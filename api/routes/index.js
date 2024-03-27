const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth/auth.routes");

router.use("/auth", AuthRoutes);

router.get("/", (req, res, next) => {
  res.json({
    message: "Hello World",
  });
});

router.use((req, res, next) => {
  next({
    status: 404,
    message: "Resource not found",
  });
});

module.exports = router;
