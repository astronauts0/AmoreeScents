var express = require("express");
const {
  isAuthenticatedUser,
  authorizedRole,
} = require("../middlewares/authMiddleware");

const {
  getProductsDetails,
  getAllProducts,
  createProduct,
  getAdminProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getProductsDetailsByID,
  getAllProductsReviews,
} = require("../controllers/productsController");

var router = express.Router();

router.route("/products").get(getAllProducts);

// product by slug
router.route("/product/:slug").get(getProductsDetails);
// product by id
router.route("/product_by_id/:id").get(getProductsDetailsByID);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

router.route("/total_reviews").get(getAllProductsReviews);
  

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRole("admin"), createProduct);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAdminProducts);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteProduct);

module.exports = router;
