const { default: mongoose } = require("mongoose");
const { showError } = require("../../lib");
const { Product, Review } = require("../../models");

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
      const products = await Product.aggregate([
        {
          $match: {
            status: true,
            _id: new mongoose.Types.ObjectId(req.params.id),
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
      ])
        .sort({ order_count: "desc" })
        .exec();

      const result = [];
      for (let product of products) {
        const reviews = await Review.aggregate([
          {
            $match: { product_id: new mongoose.Types.ObjectId(req.params.id) },
          },
          {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "user",
            },
          },
        ]).exec();

        const list = reviews.map(review => {
          return {
            _id: review._id,
            user_id: review.user_id,
            product_id: review.product_id,
            comment: review.comment,
            rating: review.rating,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            user: review.user[0],
            __v: review.__v,
          };
        });
        result.push({
          _id: product._id,
          name: product.name,
          summary: product.summary,
          description: product.description,
          price: product.price,
          discounted_price: product.discounted_price,
          images: product.images,
          category_id: product.category_id,
          brand_id: product.brand_id,
          status: product.status,
          featured: product.featured,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          _v: product._v,
          brand: product.brand[0],
          reviews: list,
        });
      }
      res.json(result[0]);
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

  // similar = async (req, res, next) => {
  //   try {
  //     const product = await Product.findById(req.params.id);
  //     const review = await Review.aggregate([
  //       {
  //         $match: { product_id: new mongoose.Types.ObjectId(req.params.id) },
  //       },
  //     ]);
  //     console.log(review);
  //     console.log(product);
  // const products = await Product.find({
  //   status: true,
  //   category_id: product.category_id,
  //   _id: { $ne: req.params.id },
  // });
  // res.json(products);
  //   } catch (error) {
  //     showError(error, next);
  //   }
  // };

  // Function to calculate Pearson Correlation
  calculatePearsonCorrelation(ratings1, ratings2) {
    const mean1 = ratings1.reduce((sum, val) => sum + val, 0) / ratings1.length;
    const mean2 = ratings2.reduce((sum, val) => sum + val, 0) / ratings2.length;

    let numerator = 0;
    let denominator1 = 0;
    let denominator2 = 0;

    for (let i = 0; i < ratings1.length; i++) {
      numerator += (ratings1[i] - mean1) * (ratings2[i] - mean2);
      denominator1 += Math.pow(ratings1[i] - mean1, 2);
      denominator2 += Math.pow(ratings2[i] - mean2, 2);
    }

    const denominator = Math.sqrt(denominator1 * denominator2);

    if (denominator === 0) return 0;

    return numerator / denominator; // Pearson Correlation Coefficient
  }

  similar = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      console.log(product);

      const reviews = await Review.aggregate([
        { $match: { product_id: new mongoose.Types.ObjectId(product) } },
      ]);

      const currentProductRatings = reviews
        .map(review => review.rating)
        .filter(rating => rating > 1); // Exclude default ratings

      // If no valid ratings, recommend based on description similarity
      if (currentProductRatings.length === 0) {
        // Fetch all products in the same category, excluding the current product
        const products = await Product.find({
          status: true,
          category_id: product.category_id,
          _id: { $ne: req.params.id },
        });

        // Current product description
        const currentDescription = product.description || "";

        // Calculate similarity for each product based on description
        const descriptionSimilarities = products.map(p => {
          const descriptionSimilarity = this.calculatepDescriptionSimilarity(
            currentDescription,
            p.description || ""
          );
          return { product: p, similarity: descriptionSimilarity };
        });

        // Sort products by description similarity (highest to lowest)
        descriptionSimilarities.sort((a, b) => b.similarity - a.similarity);

        // Return products sorted by description similarity
        res.json(descriptionSimilarities.map(item => item.product));
        return; // Exit since recommendations are handled
      }

      // Fetch other products in the same category, excluding the current product
      const products = await Product.find({
        status: true,
        _id: { $ne: req.params.id },
      });

      // Calculate Pearson Correlation for each product
      const similarities = [];
      for (const p of products) {
        // Fetch reviews for each product
        const productReviews = await Review.aggregate([
          { $match: { product_id: p._id } },
        ]);

        // Get the ratings for this product, excluding default ratings of 1
        const productRatings = productReviews
          .map(review => review.rating)
          .filter(rating => rating > 1); // Exclude default ratings

        // If no valid ratings for the compared product, skip it
        if (productRatings.length === 0) continue;

        // Calculate Pearson Correlation between the current product's ratings and this product's ratings
        const similarity = this.calculatePearsonCorrelation(
          currentProductRatings,
          productRatings
        );
        similarities.push({ product: p, similarity });
      }

      // Sort products by similarity (highest to lowest)
      similarities.sort((a, b) => b.similarity - a.similarity);

      // Return the most similar products
      res.json(similarities.map(item => item.product));
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
