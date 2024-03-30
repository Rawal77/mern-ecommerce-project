const { default: mongoose } = require("mongoose");
const { showError } = require("../../lib");
const { Product } = require("../../models");

class ProductController {
  latest = async (req, res, next) => {
    try {
      const product = await Product.find({ status: true }).sort({
        createdAt: "desc",
      });
      res.json(product);
    } catch (error) {
      showError(error, next);
    }
  };
  featured = async (req, res, next) => {
    try {
      const products = await Product.find({
        status: true,
        featured: true,
      }).sort({ createdAt: "desc" });
      res.json(products);
    } catch (error) {
      showError(error, next);
    }
  };
  topSelling = async (req, res, next) => {
    try {
      const products = await Product.aggregate([
        { $match: { status: true } },
        {
          $lookup: {
            from: "orderdetails",
            localField: "_id",
            foreignField: "product_id",
            as: "order_count",
          },
        },
        { $addFields: { order_count: { $size: "$order_count" } } },
      ]).sort({ order_count: "desc" });
      res.json(products);
    } catch (error) {
      showError(error, next);
    }
  };
  byId = async (req, res, next) => {
    try {
      const product = await Product.aggregate([
        {
          $match: {
            status: true,
            _id: new mongoose.Types.ObjectId(req.params.id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "product_id",
            as: "review",
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brand_id",
            foreignField: "_id",
            as: "brand",
          },
        },
      ]);
      const result = product.map(pro => {
        return {
          _id: pro._id,
          name: pro.name,
          summary: pro.summary,
          description: pro.description,
          price: pro.price,
          discounted_price: pro.discounted_price,
          category_id: pro.category_id,
          brand_id: pro.brand_id,
          status: pro.status,
          featured: pro.featured,
          images: pro.images,
          brand: pro.brand[0],
          review: pro.review,
          createdAt: pro.createdAt,
          updatedAt: pro.updatedAt,
        };
      });
      res.json(result);
    } catch (error) {
      showError(error, next);
    }
  };
  byCategoryId = async (req, res, next) => {
    try {
      const products = await Product.find({
        status: true,
        category_id: req.params.id,
      });
      res.json(products);
    } catch (error) {
      showError(error, next);
    }
  };
  byBrandId = async (req, res, next) => {
    try {
      const products = await Product.find({
        status: true,
        brand_id: req.params.id,
      });
      res.json(products);
    } catch (error) {
      showError(error, next);
    }
  };
  similar = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      const products = await Product.find({
        status: true,
        category_id: product.category_id,
        _id: { $ne: req.params.id },
      });
      res.json(products);
    } catch (error) {
      showError(error, next);
    }
  };
  search = async (req, res, next) => {
    try {
      const product = await Product.find({
        status: true,
        name: { $regex: req.query.term, $options: "i" },
      });
      res.json(product);
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new ProductController();
