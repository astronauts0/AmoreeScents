const fetchProductDetails = async (slug) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${slug}`,
      { 
        next: {
          tags: [`product/${slug}`],
        },
      }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch product details: ${res.status} ${res.statusText}`
      );
    }

    const response = await res.json();
    return response?.productDetails || {};
  } catch (error) {
    console.error("Error in fetchProductDetails:", error);
    throw error;
  }
};

export default fetchProductDetails;
