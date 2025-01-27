const fetchProducts = async (url = "") => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${url}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      return [];
    }

    const response = await res.json();
    return response?.products || [];
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    throw error;
  }
};

export default fetchProducts;