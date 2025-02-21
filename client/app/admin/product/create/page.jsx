"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NEW_PRODUCT_RESET } from "@/store/constants/productConstants";
import Loader from "@/utils/Loader/Loader";
import { toast } from "react-toastify";
import MetaData from "@/utils/Meta/MetaData";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import Sidebar from "@/components/dashboard/Sidebar";
import Image from "next/image";

import { clearErrors, createProduct } from "@/store/actions/productAction";
import { useRouter } from "next/navigation";
import isAuth from "@/Auth/isAuth";

import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/Editor/TextEditor"), {
  ssr: false,
});

const CreateNewProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    categories: [],
    productTags: "",
    subCategory: "perfume",
    featured: false,
    notes: "",
    description: "",
    shortDescription: "",
  });

  const [variants, setVariants] = useState([
    {
      materialType: "",
      materialDescription: "",
      size: "50ml",
      price: 0,
      originalPrice: 0,
      stock: 10,
    },
  ]);

  const handleVariantChange = (index, e) => {
    const newVariants = [...variants];
    newVariants[index][e.target.name] = e.target.value;
    setVariants(newVariants);
  };

  //% Add a new variant.
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        materialType: "",
        materialDescription: "",
        size: "50ml",
        price: 0,
        originalPrice: 0,
        stock: 10,
      },
    ]);
  };

  //! Remove a variant.
  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  // ! handleRemoveImage
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagesPreview((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const parseCommaSeparatedValues = (value) =>
    value.split(/,\s*|\s+/).map((item) => item.trim());

  const handleProductChange = (e) => {
    if (e.target.name === "productImages") {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
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
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...productData, images, variants };
    dispatch(createProduct(dataToSubmit));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      router.push("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, router]);

  return (
    <section className="min-h-screen w-full flex justify-center">
      <MetaData title="Create Product" />
      <Sidebar />
      <div className="bg-gray-200 shadow_black_1 w-full max-w-xl h-fit rounded-lg p-6 flex justify-center items-center flex-col mx-auto my-28">
        <h1 className="text-3xl font-bold leading-none text-center mb-5 mt-2.5">
          Create Product
        </h1>
        <form className="space-y-2.5" onSubmit={createProductSubmitHandler}>
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
            required
            value={productData.name}
            onChange={handleProductChange}
          />
          <input
            name="slug"
            type="text"
            placeholder="Product Slug"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
            required
            value={productData.slug}
            onChange={handleProductChange}
          />
          <input
            type="text"
            name="productTags"
            placeholder="Product Tags or Tag"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
            required
            value={productData.productTags}
            onChange={handleProductChange}
          />
          <input
            type="text"
            name="categories"
            placeholder="Categories or Category"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
            required
            value={productData.categories}
            onChange={handleProductChange}
          />
          <select
            name="subCategory"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
            required
            value={productData.subCategory}
            onChange={handleProductChange}
          >
            <option selected="true" disabled="true">
              Select Sub Category
            </option>
            <option value="perfume">perfume</option>
            <option value="attar">attar</option>
            <option value="tester">tester</option>
          </select>
          <select
            name="featured"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
            required
            value={productData.featured}
            onChange={handleProductChange}
          >
            <option selected disabled>
              Select Featured
            </option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
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
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
          />
          <div className="flex w-full overflow-hidden items-center gap-3">
            {imagesPreview?.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
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

          {/* Variants Section */}
          <div className="mt-8 w-full">
            <h2 className="text-xl font-bold mb-4">Variants</h2>
            {variants.map((variant, index) => (
              <div
                key={index}
                className="border p-4 mb-4 rounded-md flex flex-col gap-2"
              >
                <div>
                  <label>Material Type:</label>
                  <select
                    name="materialType"
                    value={variant.materialType}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                  >
                    <option value="">Select Material Type (optional)</option>
                    <option value="Simple Bottle Attar">
                      Simple Bottle Attar
                    </option>
                    <option value="Premium Bottle Attar">
                      Premium Bottle Attar
                    </option>
                    <option value="Simple Bottle Perfume">
                      Simple Bottle Perfume
                    </option>
                    <option value="Premium Bottle Perfume">
                      Premium Bottle Perfume
                    </option>
                  </select>
                </div>
                <div>
                  <label>Material Description:</label>
                  <input
                    type="text"
                    name="materialDescription"
                    placeholder="Material Description (optional)"
                    value={variant.materialDescription}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                  />
                </div>
                <div>
                  <label>Size:</label>
                  <input
                    type="text"
                    name="size"
                    placeholder="Size (e.g. 50ml, 100ml)"
                    value={variant.size}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label>Original Price:</label>
                  <input
                    type="number"
                    name="originalPrice"
                    placeholder="Variant Original Price"
                    value={variant.originalPrice}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Variant Price"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label>Stock:</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Variant Stock"
                    value={variant.stock}
                    onChange={(e) => handleVariantChange(index, e)}
                    className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                    required
                  />
                </div>
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Remove Variant
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addVariant}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Add Variant
            </button>
          </div>

          <div className="w-full flex justify-center items-center mt-10">
            {loading ? (
              <Loader height="auto" />
            ) : (
              <ButtonTextIcon
                btnType="submit"
                customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                Icon={<i className="ri-refresh-line text-lg"></i>}
                disabled={loading ? true : false}
                Text="Create"
              />
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default isAuth(CreateNewProduct, true);
