import React from "react";
import ProductRating from "@/components/Products/ProductRating";
import Accordions from "@/components/Accordions";
import CustomerReviews from "@/components/Products/CustomerReviews";
import ProductSwiper from "@/components/Products/ProductSwiper";
import fetchProductDetails from "@/modules/backend/fetchProductDetails";
import RelatedProducts from "@/components/Products/RelatedProducts";
import SalesBanner from "@/components/global/sales/SalesBanner";
import { notFound } from "next/navigation";
import ProductVariantInfo from "@/components/Products/ProductVariantInfo";

export const revalidate = 150;

export async function generateMetadata({ params }) {
  const slug = params?.slug;
  const response = await fetchProductDetails(slug);
  if (!response || !response.name) {
    notFound();
  }

  const title =
    response?.name || "Amoree Scents - Premium Fragrances at Affordable Prices";
  const description =
    `Discover Amoree Scents, Pakistan's leading brand offering high-quality fragrances at unbeatable prices. Experience luxury scents that captivate your senses. ${response?.shortDescription}` ??
    "Discover Amoree Scents, Pakistan's leading brand offering high-quality fragrances at unbeatable prices. Experience luxury scents that captivate your senses.";
  const image =
    (response?.images?.length > 0 && response?.images[0]?.url) ||
    "https://res.cloudinary.com/ddrd0vxzq/image/upload/v1737568469/socials_preview_x94t9l.gif";

  const keywords =
    response?.productTags +
      ", amoree scents, amour scents, amoree scent, amoree, amour, amoure, amoreescents, amore, amore scents, fragrances, perfumes, perfume, premium fragrances, affordable perfumes, affordable luxury perfumes, high-quality perfumes, high-quality fragrances, high-quality scents, imported perfumes, budget-friendly perfumes, signature perfume, attars, office, premium attars, unisex, unisex perfumes, everyday perfume" ??
    "Amoree Scents, scents, scent, fragrance, fragrances, perfumes, perfume, premium fragrances, affordable perfumes, affordable luxury perfumes, high-quality perfumes, high-quality fragrances, high-quality scents, top Pakistan perfumes, imported perfumes, best luxury scents in Pakistan, budget-friendly perfumes, signature scents, attars, office, premium attars, unisex, unisex perfumes, everyday perfume";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      image,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${slug}`,
    },
    canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${slug}`,
    robots: "index, follow",
  };
}

export default async function Product({ params }) {
  const slug = params?.slug;
  const response = await fetchProductDetails(slug);

  const { variants } = response;

  if (!response || !response.name) notFound();

  return (
    <section className="overflow-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: response?.name,
              image:
                response?.images[0]?.url ??
                "https://res.cloudinary.com/ddrd0vxzq/image/upload/v1737568469/socials_preview_x94t9l.gif",
              description: response?.shortDescription,
              brand: {
                "@type": "Brand",
                name: "Amorée Scents",
              },
              offers: {
                "@type": "Offer",
                url: process.env.NEXT_PUBLIC_FRONTEND_URL + "/" + slug,
                priceCurrency: "PKR",
                price: response?.price,
                itemCondition: "https://schema.org/NewCondition",
                availability: response?.stock > 0 ? "InStock" : "OutOfStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: response?.ratings,
                reviewCount: response?.reviews?.length,
              },
            }),
          }}
        />
      </head>
      <div className="w-full pt-32 pb-20 space-y-20 px-3 sm:px-5 min-h-screen relative">
        {/* <SalesBanner customize={{ top: "6.5rem" }} /> */}

        <div className="flex flex-col md:flex-row justify-center gap-y-10 md:gap-x-10">
          <div className="w-full md:w-1/2">
            <ProductSwiper images={response?.images} />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="tracking-widest dancing_script text-lg">
              {response?.subCategory}
            </h3>
            <h1 className="text-3xl text_stroke text_stroke_color font-medium capitalize Havelock_Medium">
              {response?.name}
            </h1>
            <h2 className="text-xl text-gray-700 font-medium capitalize neue_machina_regular">
              {response?.shortDescription}
            </h2>
            <div className="flex items-center gap-x-3">
              <div className="animate-pulse">
                <ProductRating ratings={response?.ratings} />
              </div>
              <span className="-translate-y-1 Havelock_Medium">
                {" "}
                <span className="obviously">
                  {response?.reviews?.length}
                </span>{" "}
                Reviews
              </span>
            </div>
            <ProductVariantInfo variants={variants} product={response} />
          </div>
        </div>

        <Accordions description={response?.description} />

        <RelatedProducts subCategory={response?.subCategory} slug={slug} />

        <CustomerReviews
          reviews={response?.reviews}
          productId={response?._id}
          ratings={response?.ratings}
        />
      </div>
    </section>
  );
}
