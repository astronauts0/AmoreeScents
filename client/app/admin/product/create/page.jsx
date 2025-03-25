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

  // Images state
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // Product fields as per schema
  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    productTags: "",
    description: "",
    shortDescription: "",
    categories: [],
    subCategory: "",
    featured: false,
  });

  // Product attributes state (as an array to allow dynamic fields)
  const [productAttributes, setProductAttributes] = useState([
    { key: "", value: "" },
  ]);

  // Variants state matching schema (each variant includes its own attributes)
  const [variants, setVariants] = useState([
    {
      shortInfo: "",
      price: 0,
      originalPrice: 0,
      stock: 10,
      attributes: [], // Variant specific attributes
    },
  ]);

  const handleReset = () => {
    setProductAttributes([{ key: "", value: "" }]);
    setImages([]);
    setImagesPreview([]);
    setProductData({
      name: "",
      slug: "",
      productTags: "",
      description: "",
      shortDescription: "",
      categories: [],
      subCategory: "",
      featured: false,
    });
    setVariants([
      {
        shortInfo: "",
        price: 0,
        originalPrice: 0,
        stock: 10,
        attributes: [], // Variant specific attributes
      },
    ]);
  };

  // ----- Product Attributes Handlers -----
  const handleProductAttributeChange = (index, field, e) => {
    let value = e.target.value;

    if (value.length > 0)
      value = value.charAt(0).toLowerCase() + value.slice(1);

    const updatedAttributes = [...productAttributes];
    updatedAttributes[index][field] = value;
    setProductAttributes(updatedAttributes);
  };
  const addProductAttribute = () => {
    setProductAttributes([...productAttributes, { key: "", value: "" }]);
  };

  const removeProductAttribute = (index) => {
    const newAttributes = productAttributes.filter((_, i) => i !== index);
    setProductAttributes(newAttributes);
  };

  // ----- Variant Attributes Handlers -----
 const handleVariantAttributeChange = (variantIndex, attrIndex, field, e) => {
   let value = e.target.value;
   if (value.length > 0) value = value.charAt(0).toLowerCase() + value.slice(1);

   const newVariants = [...variants];
   newVariants[variantIndex].attributes[attrIndex][field] = value;
   setVariants(newVariants);
 };

  const addVariantAttribute = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].attributes.push({ key: "", value: "" });
    setVariants(newVariants);
  };

  const removeVariantAttribute = (variantIndex, attrIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].attributes = newVariants[
      variantIndex
    ].attributes.filter((_, i) => i !== attrIndex);
    setVariants(newVariants);
  };

  // ----- Variant Handlers -----
  const handleVariantChange = (index, e) => {
    const newVariants = [...variants];
    newVariants[index][e.target.name] = e.target.value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { shortInfo: "", price: 0, originalPrice: 0, stock: 10, attributes: [] },
    ]);
  };

  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  // ----- Image Handlers -----
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagesPreview((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  // Parse comma-separated values for categories
  const parseCommaSeparatedValues = (value) =>
    value.split(/,\s*|\s+/).map((item) => item.trim());

  // Handle changes for product fields and image uploads
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
    } else if (e.target.name === "featured") {
      setProductData({
        ...productData,
        featured: JSON.parse(e.target.value),
      });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

const createProductSubmitHandler = (e) => {
  e.preventDefault();

  // Convert productAttributes array to an object
  const attributesObject = {};
  productAttributes.forEach((attr) => {
    if (attr.key.trim()) {
      attributesObject[attr.key] = attr.value;
    }
  });

  const transformedVariants = variants.map((variant) => {
      const variantAttrsObj = {};
      variant.attributes.forEach((attr) => {
        if (attr.key.trim()) {
          variantAttrsObj[attr.key] = attr.value;
        }
      });
      return {
        shortInfo: variant.shortInfo,
        price: variant.price,
        originalPrice: variant.originalPrice,
        stock: variant.stock,
        attributes: variantAttrsObj,
      };
    });

  const dataToSubmit = {
    ...productData,
    images,
    variants: transformedVariants, // Corrected variant attributes
    attributes: attributesObject, // Converted attributes
  };

  dispatch(createProduct(dataToSubmit));
};


  // Effect to handle errors and success
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
      <div className="bg-gray-200 shadow_black_1 w-full max-w-2xl h-fit rounded-lg p-6 flex flex-col mx-auto my-28">
        <h1 className="text-3xl font-bold text-center mb-5 mt-2.5">
          Create Product
        </h1>
        <form className="space-y-3.5" onSubmit={createProductSubmitHandler}>
          {/* Product Basic Fields */}
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
            required
            value={productData.name}
            onChange={handleProductChange}
          />
          <input
            name="slug"
            type="text"
            placeholder="Product Slug"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
            required
            value={productData.slug}
            onChange={handleProductChange}
          />
          <input
            type="text"
            name="productTags"
            placeholder="Product Tags (comma separated)"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
            required
            value={productData.productTags}
            onChange={handleProductChange}
          />
          <input
            type="text"
            name="categories"
            placeholder="Categories (comma separated)"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
            required
            onChange={handleProductChange}
            value={productData.categories}
          />
          <input
            type="text"
            name="subCategory"
            placeholder="Sub Category"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
            value={productData.subCategory}
            onChange={handleProductChange}
          />
          <select
            name="featured"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
            required
            // value={productData.featured}
            onChange={handleProductChange}
          >
            <option selected disabled>
              Select Featured
            </option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <textarea
            name="shortDescription"
            placeholder="Short Description"
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 resize-none"
            required
            value={productData.shortDescription}
            onChange={handleProductChange}
          ></textarea>

          {/* Image Upload */}
          <input
            type="file"
            name="productImages"
            accept="image/*"
            onChange={handleProductChange}
            multiple
            className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
          />
          <div className="flex flex-wrap gap-3">
            {imagesPreview.map((image, index) => (
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

          {/* Description via Text Editor */}
          <TextEditor
            productData={productData}
            setProductData={setProductData}
          />

          {/* Product Attributes Section */}
          <div className="border py-4 rounded-md">
            <h2 className="text-xl font-bold mb-3">Product Attributes</h2>
            {productAttributes.map((attr, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Attribute Key"
                  value={attr.key}
                  onChange={(e) =>
                    handleProductAttributeChange(index, "key", e)
                  }
                  className="outline-none border border_color px-2 py-1 first-letter:lowercase"
                />
                <input
                  type="text"
                  placeholder="Attribute Value"
                  value={attr.value}
                  onChange={(e) =>
                    handleProductAttributeChange(index, "value", e)
                  }
                  className="outline-none border border_color px-2 py-1 first-letter:lowercase"
                />
                {productAttributes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProductAttribute(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addProductAttribute}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add Attribute
            </button>
          </div>

          {/* Variants Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Variants</h2>
            {variants.map((variant, index) => (
              <div
                key={index}
                className="border p-4 mb-4 rounded-md flex flex-col gap-4"
              >
                <input
                  type="text"
                  name="shortInfo"
                  placeholder="Variant Info"
                  className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                  required
                  value={variant.shortInfo}
                  onChange={(e) => handleVariantChange(index, e)}
                />
                <input
                  type="number"
                  name="originalPrice"
                  placeholder="Original Price"
                  className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                  required
                  // value={variant.originalPrice}
                  onChange={(e) => handleVariantChange(index, e)}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                  required
                  // value={variant.price}
                  onChange={(e) => handleVariantChange(index, e)}
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2"
                  required
                  // value={variant.stock}
                  onChange={(e) => handleVariantChange(index, e)}
                />

                {/* Variant Attributes Section */}
                <div className="border p-3 rounded-md">
                  <h3 className="font-semibold mb-2">Variant Attributes</h3>
                  {variant.attributes &&
                    variant.attributes.map((attr, attrIndex) => (
                      <div
                        key={attrIndex}
                        className="flex items-center gap-2 mb-2"
                      >
                        <input
                          type="text"
                          placeholder="Key"
                          value={attr.key}
                          onChange={(e) =>
                            handleVariantAttributeChange(
                              index,
                              attrIndex,
                              "key",
                              e
                            )
                          }
                          className="outline-none border border_color px-2 py-1 first-letter:lowercase"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={attr.value}
                          onChange={(e) =>
                            handleVariantAttributeChange(
                              index,
                              attrIndex,
                              "value",
                              e
                            )
                          }
                          className="outline-none border border_color px-2 py-1 first-letter:lowercase"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeVariantAttribute(index, attrIndex)
                          }
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => addVariantAttribute(index)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Add Attribute
                  </button>
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

          <div className="w-full flex justify-center items-center mt-14 gap-x-4">
            {loading ? (
              <Loader height="auto" />
            ) : (
              <ButtonTextIcon
                btnType="submit"
                customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                Icon={<i className="ri-refresh-line text-lg"></i>}
                disabled={loading}
                Text="Create"
              />
            )}
            <div onClick={handleReset}>
              <ButtonTextIcon
                customize="px-4 py-2 transition-all duration-1000 hover:rounded-full"
                Icon={<i className="ri-refresh-line text-lg"></i>}
                Text="Reset"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default isAuth(CreateNewProduct, true);
