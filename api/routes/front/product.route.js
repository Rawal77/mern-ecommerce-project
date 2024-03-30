const express = require("express");
const router = express.Router();
const { Front } = require("../../controllers");

router.get("/featured", Front.Product.featured);
router.get("/latest", Front.Product.latest);
router.get("/top-selling", Front.Product.topSelling);
router.get("/:id", Front.Product.byId);
router.get("/:id/similar", Front.Product.similar);

module.exports = router;
