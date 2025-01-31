"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "@/store/actions/productAction";
import { UPDATE_PRODUCT_RESET } from "@/store/constants/productConstants";
import { clearErrors } from "@/store/actions/userAction";
import { getProductsDetails } from "@/store/actions/productDetailsAction";
import Loader from "@/utils/Loader/Loader";
import { toast } from "react-toastify";
import MetaData from "@/utils/Meta/MetaData";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import Sidebar from "@/components/dashboard/Sidebar";
import Image from "next/image";
import TextEditor from "@/components/Editor/TextEditor";
import { useRouter } from "next/navigation";
import isAuth from "@/Auth/isAuth";

const UpdateProduct = ({ params: { id: productId } }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [productData, setProductData] = useState({
    name: product?.name,
    slug: product?.slug,
    price: product?.price,
    originalPrice: product?.originalPrice,
    stock: product?.stock,
    categories: product?.categories,
    productTags: product?.productTags,
    subCategory: product?.subCategory,
    description: product?.description,
    notes: product?.notes,
    shortDescription: product?.shortDescription,
  });

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const parseCommaSeparatedValues = (value) =>
    value.split(/,\s*|\s+/).map((item) => item.trim());

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagesPreview((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleProductChange = (e) => {
    if (e.target.name === "productImages") {
      const files = Array.from(e.target.files);
      files?.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    } else if (e.target.name === "categories") {
      const parsedValues = parseCommaSeparatedValues(e.target.value);
      setProductData({ ...productData, categories: parsedValues });
      //   setProductData({ ...productData, [e.target.name]: parsedValues });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct(productId, { ...productData, images }));
  };

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(getProductsDetails(productId));
    } else {
      setProductData({
        name: product?.name,
        slug: product?.slug,
        price: product?.price,
        originalPrice: product?.originalPrice,
        stock: product?.stock,
        categories: product?.categories,
        productTags: product?.productTags,
        subCategory: product?.subCategory,
        description: product?.description,
        notes: product?.notes,
        shortDescription: product?.shortDescription,
      });
      setImagesPreview(product?.images || []);
      setImages(product?.images || []);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      dispatch(getProductsDetails(productId));
      router.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, product, productId, error, isUpdated, updateError]);

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen w-full flex justify-center">
      <MetaData title="Update Product" />
      <Sidebar />
      <div
        className={`bg-gray-200 shadow_black_1 w-full max-w-xl h-fit rounded-lg p-6 flex justify-center items-center flex-col mx-auto my-28 `}
      >
        <h1 className="text-3xl font-bold leading-none text-center mb-5 mt-2.5">
          Update Product
        </h1>
        <form className="space-y-4" onSubmit={updateProductSubmitHandler}>
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
            required
            value={productData.name}
            onChange={handleProductChange}
          />
          <input
            name="slug"
            type="text"
            placeholder="Product Slug"
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
            required
            value={productData.slug}
            onChange={handleProductChange}
          />
          <input
            name="originalPrice"
            type="number"
            placeholder="Original Price"
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
            required
            value={productData.originalPrice}
            onChange={handleProductChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
            required
            value={productData.price}
            onChange={handleProductChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
            required
            value={productData.stock}
            onChange={handleProductChange}
          />
          <input
            type="text"
            name="productTags"
            placeholder="Product Tags or Tag"
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
            required
            value={productData.productTags}
            onChange={handleProductChange}
          />
          <input
            type="text"
            name="categories"
            placeholder="Categories or Category"
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
            required
            value={productData.categories}
            onChange={handleProductChange}
          />
          <input
            type="text"
            name="subCategory"
            placeholder="Sub Category"
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
            required
            value={productData.subCategory}
            onChange={handleProductChange}
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
            required
            value={productData.notes}
            onChange={handleProductChange}
          />
          <textarea
            cols="3"
            rows="3"
            name="shortDescription"
            placeholder="Short Description"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4 resize-none"
            value={productData.shortDescription}
            required
            onChange={handleProductChange}
          ></textarea>

          <input
            type="file"
            name="productImages"
            accept="image/*"
            onChange={handleProductChange}
            multiple
            className="text-center outline-none bg-transparent border border_color  block w-full px-3 py-2 mt-4"
          />

          <div className="flex w-full overflow-hidden items-center gap-3">
            {imagesPreview?.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image?.url || (image && image)}
                  alt="Product Preview"
                  width={50}
                  height={50}
                  className="block"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <TextEditor
            productData={productData}
            setProductData={setProductData}
          />
          <div className="w-full flex justify-center items-center mt-10">
            {loading ? (
              <Loader />
            ) : (
              <ButtonTextIcon
                btnType="submit"
                customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                Icon={<i className="ri-refresh-line text-lg"></i>}
                disabled={loading ? true : false}
                Text="Update"
              />
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default isAuth(UpdateProduct,true);
