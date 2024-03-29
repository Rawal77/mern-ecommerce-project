const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth/auth.routes");
const CmsRoutes = require("./cms");
const { auth, cms } = require("../middleware");

router.use("/auth", AuthRoutes);
router.use("/cms", auth, cms, CmsRoutes);

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
