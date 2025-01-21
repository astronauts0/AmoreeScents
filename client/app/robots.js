export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "*",
      disallow: [
        "/profile/",
        "/order/",
        "/orders/",
        "/password/",
        "/shipping/",
        "/admin/",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`,
  };
}