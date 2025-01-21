import fetchProducts from "@/modules/backend/fetchProducts";

export default async function sitemap() {
  let productSlugs = [];

  try {
    const products = await fetchProducts();

    productSlugs =
      products?.map((product) => ({
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/product/${product?.slug}`,
        lastModified: product?.lastModified || new Date(),
      })) || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return [
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
      lastModified: new Date(),
    },
    ...productSlugs,
  ];
}
