const express = require("express");
const router = express.Router();
const staffRoute = require("./staff.route");
const brandRoute = require("./brand.route");
const categoryRoute = require("./category.route");
const { adminOnly } = require("../../middleware");

router.use("/staffs", adminOnly, staffRoute);
router.use("/brands", brandRoute);
router.use("/categories", categoryRoute);

module.exports = router;
