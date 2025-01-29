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
    price: {
      type: Number,
      required: [true, "Please Enter product price"],
      maxLength: [8, "Price cannot exceed 8 characters"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Please Enter product original price"],
      maxLength: [8, "Original Price cannot exceed 8 characters"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxLength: [10, "Stock cannot exceed 10 characters"],
    },
    categories: [
      {
        type: String,
        required: [true, "Please Enter Product Category"],
      },
    ],
    subCategory: {
      type: String,
      required: [true, "Please Enter Product Sub Category"],
    },
    notes: {
      type: String,
      required: [true, "Please Enter Product Notes"],
    },
    description: {
      type: String,
      required: [true, "Please Enter product Description"],
    },
    shortDescription: {
      type: String,
      required: [true, "Please Enter product short description"],
    },
    productTags: {
      type: String,
      required: [true, "Please Enter product tags or tag"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
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
        userImg: { type: String },
        name: { type: String },
        rating: { type: Number },
        reviewTitle: { type: String },
        comment: { type: String },
        images: [{ public_id: { type: String }, url: { type: String } }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
