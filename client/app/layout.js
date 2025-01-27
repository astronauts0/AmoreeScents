import React from "react";
import dynamic from "next/dynamic";
import { GoogleTagManager } from "@next/third-parties/google";

import Footer from "../components/global/Footer/Footer";
import LoadUserProvider from "../store/LoadUserProvider";
import { StoreProvider } from "../store/StoreProvider";

import "./globals.css";

const LayoutClientComponents = dynamic(
  () => import("../modules/LayoutClientComponents"),
  {
    ssr: false,
  }
);

const Header = dynamic(() => import("../components/global/Header/Header"), {
  ssr: false,
});

const Lenis = dynamic(() => import("../libs/Lenis"), {
  ssr: false,
});

export const metadata = {
  title: "Amoree Scents - Premium Fragrances at Affordable Prices",
  description:
    "Discover Amoree Scents, Pakistan's leading brand offering high-quality fragrances at unbeatable prices. Experience luxury scents that captivate your senses.",
  keywords:
    "amoree scents, amoree, amour, amour scents, amoree scent, amoure, amoreescents, amore, amore scents, scents, scent, fragrance, fragrances, perfumes, perfume, premium fragrances, affordable perfumes, affordable luxury perfumes, high-quality perfumes, high-quality fragrances, high-quality scents, top Pakistan perfumes, imported perfumes, best luxury scents in Pakistan, budget-friendly perfumes, signature scents",
  openGraph: {
    title: "Amoree Scents - Premium Fragrances at Affordable Prices",
    description:
      "Discover Amoree Scents, Pakistan's leading brand offering high-quality fragrances at unbeatable prices. Experience luxury scents that captivate your senses.",
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    image:
      "https://res.cloudinary.com/ddrd0vxzq/image/upload/v1737568469/socials_preview_x94t9l.gif",
    type: "website",
    locale: "en_US",
  },
  canonical: process.env.NEXT_PUBLIC_FRONTEND_URL,
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={metadata.canonical} />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Darker+Grotesque:wght@300..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.4.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="/images/svgs/mono_black.svg"
          type="image/svg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Amorée Scents",
              url: process.env.NEXT_PUBLIC_FRONTEND_URL,
              logo: "https://res.cloudinary.com/ddrd0vxzq/image/upload/v1737568469/socials_preview_x94t9l.gif",
              sameAs: [
                "https://www.facebook.com/amoreescent",
                "https://www.instagram.com/amoree_scents/",
                "https://www.tiktok.com/@amoree_scents",
              ],
            }),
          }}
        />
      </head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      <body theme="black">
        <LayoutClientComponents />
        <Lenis>
          <StoreProvider>
            <LoadUserProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </LoadUserProvider>
          </StoreProvider>
        </Lenis>
      </body>
    </html>
  );
}
