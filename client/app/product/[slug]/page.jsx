import React from "react";
import ProductRating from "@/components/Products/ProductRating";
import FormatPrice from "@/utils/functions/FormatPrice";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ColorizeIcon from "@mui/icons-material/Colorize";
import AddToCart from "@/components/Products/AddToCart";
import Accordions from "@/components/Accordions";
import CustomerReviews from "@/components/Products/CustomerReviews";
import ProductSwiper from "@/components/Products/ProductSwiper";
import Link from "next/link";
import fetchProductDetails from "@/modules/backend/fetchProductDetails";
import RelatedProducts from "@/components/Products/RelatedProducts";
import SalesBanner from "@/components/global/sales/SalesBanner";
import { notFound } from "next/navigation";

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

  if (!response || !response.name) {
    notFound();
  }

  const noTester = ["simple", "bottle"].every((word) =>
    response?.name?.split(" ").includes(word)
  );

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
        <SalesBanner customize={{ top: "6.5rem" }} />

        <div className="flex flex-col md:flex-row items-center justify-center gap-y-10 md:gap-x-10">
          <div className="w-full md:w-1/2">
            <ProductSwiper images={response?.images} />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="tracking-widest dancing_script text-lg">
              {response?.subCategory}
            </h3>
            <h1 className="text-3xl title-font font-medium capitalize Havelock_Medium">
              {response?.name}
            </h1>
            <h2 className="text-xl text-gray-700 title-font font-medium capitalize satoshi_medium">
              {response?.shortDescription}
            </h2>
            <div className="flex items-center gap-x-3">
              <div className="animate-pulse">
                <ProductRating ratings={response?.ratings} />
              </div>
              <span>
                {" "}
                <span className="obviously">
                  {response?.reviews?.length}
                </span>{" "}
                Reviews
              </span>
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-3 text-lg obviously">
                <span>
                  <FormatPrice price={response?.price} />
                </span>
                <del>
                  <FormatPrice price={response?.originalPrice} />
                </del>
                <span className="color__red">
                  {" "}
                  Save{" "}
                  <FormatPrice
                    price={response?.originalPrice - response?.price}
                  />
                </span>
              </div>
              <small className="darker_grotesque font-medium">
                <Link
                  className="underline underline-offset-4"
                  href="/policies/shipping-policy"
                >
                  Shipping
                </Link>{" "}
                calculated at checkout.
              </small>
            </div>
            <ul className="space-y-2 border_color border-t pt-4 darker_grotesque font-bold text-lg">
              <li className="space-x-3">
                <CardGiftcardOutlinedIcon />{" "}
                <span>FREE gift packing with every order</span>
              </li>
              {noTester ? (
                ""
              ) : (
                <li className="space-x-3">
                  <ColorizeIcon /> <span>1ml Tester free</span>
                </li>
              )}
              <li className="space-x-3">
                <LanguageOutlinedIcon /> <span>14 Days easy return</span>
              </li>
              <li className="space-x-3 pl-1">
                {response?.stock > 0 ? (
                  <div className="flex items-center gap-x-5">
                    <span class="relative flex size-3 ml-1">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
                    </span>
                    <span>In stock, ready to ship</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-5">
                    <span class="relative flex size-3 ml-1">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                      <span class="relative inline-flex size-3 rounded-full bg-red-500"></span>
                    </span>
                    <span>Out of stock</span>
                  </div>
                )}
              </li>
            </ul>

            <AddToCart
              slug={response?.slug}
              stock={response?.stock}
              id={response?._id}
            />
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
