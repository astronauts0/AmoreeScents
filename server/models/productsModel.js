const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    shortDescription: {
      type: String,
      required: [true, "Please enter product short description"],
    },
    productTags: {
      type: String,
      required: [true, "Please enter product tags"],
    },
    attributes: {
      type: Map,
      of: String,
      default: {},
    },
    variants: [
      {
        shortInfo: { type: String, required: true }, 
        attributes: {
          type: Map,
          of: String,
          default: {},
        },
        price: {
          type: Number,
          required: [true, "Price is required for variant"],
        },
        originalPrice: {
          type: Number,
          required: [true, "Original price is required for variant"],
        },
        stock: {
          type: Number,
          required: [true, "Stock is required for variant"],
        },
      },
    ],
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "User" },
        name: { type: String },
        rating: { type: Number },
        reviewTitle: { type: String },
        comment: { type: String },
        images: [{ public_id: { type: String }, url: { type: String } }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    categories: [
      {
        type: String,
        required: [true, "Please enter product category"],
      },
    ],
    subCategory: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);