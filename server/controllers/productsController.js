const productsModel = require("../models/productsModel");
const ErrorHandler = require("../utils/error/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/Features/apiFeatures");
const cloudinary = require("cloudinary").v2;

//* Get All Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 6;
  const productsCount = await productsModel.countDocuments();

  const apiFeatures = new ApiFeatures(productsModel.find(), req.query)
    .search()
    .filter();

  // apiFeatures.query = apiFeatures.query.select('name price images stock slug shortDescription subCategory');

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resultPerPage);
  products = await apiFeatures.query.clone();

  if (!products) return next(new ErrorHandler("Products Not Found", 404));

  return res.status(200).json({
    success: true,
    products,
    filteredProductsCount,
    resultPerPage,
    productsCount,
  });
});

//* Get Products Details by slug
exports.getProductsDetails = catchAsyncError(async (req, res, next) => {
  const productDetails = await productsModel
    .find({ slug: req.params.slug })
    .populate({
      path: "reviews.user",
      select: "orders",
    });
  if (!productDetails)
    return next(new ErrorHandler("Product Details Not Found", 404));

  return res.status(200).json({
    success: true,
    productDetails,
  });
});

//* Get Products Details by Id
exports.getProductsDetailsByID = catchAsyncError(async (req, res, next) => {
  const productDetails = await productsModel.findById(req.params.id);
  if (!productDetails)
    return next(new ErrorHandler("Product Details Not Found", 404));

  return res.status(200).json({
    success: true,
    productDetails,
  });
});

//* create New Review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId, images, reviewTitle } = req.body;

  const product = await productsModel.findById(productId);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    if (isReviewed.images && isReviewed.images.length > 0) {
      for (let image of isReviewed.images) {
        await cloudinary.uploader.destroy(image?.public_id, {
          folder: "Amoree/products/Reviews",
        });
      }
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "Amoree/products/Reviews",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    isReviewed.rating = Number(rating);
    isReviewed.reviewTitle = reviewTitle;
    isReviewed.comment = comment;
    isReviewed.userImg = req.user.avatar?.url;
    isReviewed.images = imagesLinks;
  } else {
    // Upload images for a new review
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "Amoree/products/Reviews",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const review = {
      user: req.user._id,
      userImg: req.user?.avatar?.url,
      name: req.user?.name,
      rating: Number(rating),
      reviewTitle,
      comment,
      images: imagesLinks,
    };

    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Update the product's rating
  let avg = 0;
  product.reviews.forEach((rev) => (avg += rev.rating));
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  return res.status(200).json({ success: true });
});

//* Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await productsModel
    .findById(req.query.id)
    .populate("reviews.user");
  if (!product) return next(new ErrorHandler("Product Not Found", 404));
  return res.status(200).json({ success: true, reviews: product.reviews });
});

//* Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await productsModel.findById(req.query.productId);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  const reviewToDelete = product.reviews.filter(
    (rev) => rev._id.toString() === req.query.id.toString()
  );

  if (reviewToDelete && reviewToDelete[0]?.images) {
    reviewToDelete[0]?.images.forEach(async (image) => {
      await cloudinary.uploader.destroy(image?.public_id, {
        folder: "Amoree/products/Reviews",
      });
    });
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = reviews.reduce((sum, rev) => sum + rev.rating, 0);
  let ratings = reviews.length ? avg / reviews.length : 0;

  const numOfReviews = reviews.length;

  await productsModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  return res.status(200).json({ success: true, reviews });
});

//# Create The Product by ~~Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "Amoree/products/all",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await productsModel.create(req.body);
  if (!product) return next(new ErrorHandler("Product Not Create", 404));
  return res.status(200).json({ success: true, product });
});

//# Get All Products by ~~Admin
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await productsModel.find();

  if (!products) return next(new ErrorHandler("Products Not Found", 404));

  return res.status(200).json({
    success: true,
    products,
  });
});

//# Update The Product by ~~Admin

// Update product controller
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const { id: productId } = req.params;
  const {
    name,
    slug,
    price,
    originalPrice,
    stock,
    categories,
    productTags,
    subCategory,
    notes,
    description,
    shortDescription,
    images = [],
  } = req.body;

  let product = await productsModel.findById(productId);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  const updatedImages = await Promise.all(
    images.map(async (img) => {
      if (!img.url) {
        
        if (product?.images && product?.images.length > 0) {
          for (const image of product?.images) {
            if (image?.public_id) {
              await cloudinary.uploader.destroy(image?.public_id, {
                folder: "Amoree/products/all",
              });
            }
          }
        }

        try {
          const { public_id, secure_url } = await cloudinary.uploader.upload(
            img,
            { folder: "Amoree/products/all" }
          );
          return { public_id, url: secure_url };
        } catch (error) {
          console.log("Image upload failed:", error);
          return null;
        }
      }
      return img;
    })
  );

  product = await productsModel.findByIdAndUpdate(
    productId,
    {
      name,
      slug,
      price,
      originalPrice,
      stock,
      categories,
      subCategory,
      productTags,
      description,
      notes,
      shortDescription,
      images: updatedImages,
    },
    { new: true, runValidators: true }
  );

  return res.status(200).json({ success: true, product });
});

//# Delete The Product by ~~Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await productsModel.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Delete", 404));

  if (product?.images?.length > 0) {
    for (let i = 0; i < product?.images?.length; i++) {
      await cloudinary.uploader.destroy(product?.images[i]?.public_id, {
        folder: "Amoree/products/all",
      });
    }
  }
  await productsModel.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
});
