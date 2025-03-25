const productsModel = require("../../models/productsModel");
const ErrorHandler = require("../error/errorHandler");

const updateStock = async (id, variantId, qty) => {
  const product = await productsModel.findById(id);
  if (!product) throw new ErrorHandler("Product not found", 404);

  const variant = product.variants.find((v) => v._id.toString() === variantId);
  if (!variant)
    throw new ErrorHandler(`Product ${product.name} is out of stock.`, 400);

  if (variant.stock < qty)
    throw new ErrorHandler(`Only ${variant.stock} items left in stock.`, 400);

  variant.stock -= qty;
  await product.save({ validateBeforeSave: false });
};

module.exports = updateStock;
