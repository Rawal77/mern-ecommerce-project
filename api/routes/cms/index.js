const express = require("express");
const router = express.Router();
const staffRoute = require("./staff.route");
const { adminOnly } = require("../../middleware");

router.use("/staffs", adminOnly, staffRoute);

module.exports = router;
