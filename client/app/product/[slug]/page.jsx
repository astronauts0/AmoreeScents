import React from "react";
import ProductRating from "@/components/Products/ProductRating";
import FormatPrice from "@/utils/functions/FormatPrice";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AddToCart from "@/components/Products/AddToCart";
import Accordions from "@/components/Accordions";
import CustomerReviews from "@/components/Products/CustomerReviews";
import ProductSwiper from "@/components/Products/ProductSwiper";
import Link from "next/link";
import fetchProductDetails from "@/modules/backend/fetchProductDetails";
import RelatedProducts from "@/components/Products/RelatedProducts";
import SalesBanner from "@/components/global/sales/SalesBanner";

export async function generateMetadata({ params }) {
  const slug = params?.slug;
  const response = await fetchProductDetails(slug);
  const title =
    response?.name ?? "Amorée Scents - Premium Fragrances at Affordable Prices";
  const description =
    `Discover Amorée Scents, Pakistan's leading brand offering high-quality fragrances at unbeatable prices. Experience luxury scents that captivate your senses. ${response?.shortDescription}` ??
    "Discover Amorée Scents, Pakistan's leading brand offering high-quality fragrances at unbeatable prices. Experience luxury scents that captivate your senses.";
  const image = response?.images[0]?.url ?? "/images/gifs/socials_preview.gif";

  const keywords =
    response?.productTags +
      ", Amorée Scents, fragrances, perfumes, perfume, premium fragrances, affordable perfumes, affordable luxury perfumes, high-quality perfumes, high-quality fragrances, high-quality scents, imported perfumes, budget-friendly perfumes, signature perfume" ??
    "Amorée Scents, scents, scent, fragrance, fragrances, perfumes, perfume, premium fragrances, affordable perfumes, affordable luxury perfumes, high-quality perfumes, high-quality fragrances, high-quality scents, top Pakistan perfumes, imported perfumes, best luxury scents in Pakistan, budget-friendly perfumes, signature scents";

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
              image: response?.images?.map((img) => img.url),
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
      <section className="w-full pt-32 pb-20 space-y-20 overflow-hidden px-5 md:px-12 min-h-screen relative">
        <SalesBanner customize={{ top: "6.5rem" }} />

        <div className="flex flex-col md:flex-row overflow-hidden items-center justify-center gap-y-10 md:gap-x-10">
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
              <ProductRating ratings={response?.ratings} />
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
              <li className="space-x-3">
                <LanguageOutlinedIcon /> <span>14 Days easy return</span>
              </li>
              <li className="space-x-3 pl-1">
                {response?.stock > 0 ? (
                  <>
                    <div className="size-3 inline-block rounded-full animate-pulse bg-green-400" />
                    <span>In stock, ready to ship</span>
                  </>
                ) : (
                  <>
                    <div className="size-3 inline-block rounded-full animate-pulse bg-red-400" />
                    <span>Out of stock</span>
                  </>
                )}
              </li>
            </ul>

            <AddToCart stock={response?.stock} id={response?._id} />
          </div>
        </div>

        <Accordions description={response?.description} />

        <RelatedProducts subCategory={response?.subCategory} slug={slug} />

        <CustomerReviews
          reviews={response?.reviews}
          productId={response?._id}
          ratings={response?.ratings}
        />
      </section>
    </section>
  );
}
