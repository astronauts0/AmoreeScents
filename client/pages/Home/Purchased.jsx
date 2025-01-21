'use client'
import React from 'react'
import Image from 'next/image';
import WheelSvg from '@/components/svgs/WheelSvg';
import FlowerSvg from '@/components/svgs/FlowerSvg';
import StarStrokeSvg from '@/components/svgs/StarStrokeSvg';
import StarSvg from '@/components/svgs/StarSvg';
import PriceSvg from '@/components/svgs/PriceSvg';
import { ShoppingCartOutlined } from '@mui/icons-material';
import Link from 'next/link';
import ButtonTextIcon from '@/components/global/Buttons/ButtonTextIcon';
import ProductRating from '@/components/Products/ProductRating';

const Purchased = ({ purchasedRef }) => {

    return (
        <section
          ref={purchasedRef}
          className="purchased__wrapper relative darker_grotesque h-screen w-full overflow-hidden"
        >
          <div className="absolute bottom-10 md:bottom-auto md:top-[11%] z-30 left-1/2 w-full md:w-auto -translate-x-1/2 overflow-hidden">
            <div className="text-base flex flex-col items-center p-4 border border_color size-20 overflow-hidden purchased__card mx-auto">
              <div className="h-[50vh]"></div>

              <div className="flex items-center justify-between gap-x-3 w-full">
                <div className="relative">
                  <Image
                    src={'/images/svgs/bar code.svg'}
                    width={300}
                    height={1000}
                    alt="bar code"
                    className="bg-white bar__code"
                  />
                  <Image
                    className="purchasedLine opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    src={'/images/svgs/purchased_line.svg'}
                    alt="purchasedLine"
                    width={200}
                    height={1}
                  />
                </div>
                <div className="w-full purchased">
                  <div className="w-6 text-center border border-black rounded-full">
                    <h1 className="w-full -mt-1 opacity-0 scale-0">
                      Purchased
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center w-full text-xs leading-3 font-semibold gap-8 pt-3">
                <div className="w-full uppercase overflow-hidden">
                  <div className="space-y-1.5 purchased__card__spec">
                    <div className="text-center w-full text-base dancing_script tracking-widest purchased__title">
                      Zynor
                    </div>
                    <div className="flex justify-between w-full">
                      <span>perfume oil</span>
                      <span>36%</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span>chemical</span>
                      <span>64%</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span>long lasting</span>
                      <span>8h</span>
                    </div>
                  </div>
                </div>
                <ul className="w-full space-y-2 purchased__card__dets">
                  <li>
                    Zynor: A bold, luxurious impressions of Zarar Gold for those
                    who dare to stand out.
                  </li>
                  <li>
                    <Link
                      href="/product/zynor-50ml-bottle-1.0"
                      className="pt-2 w-full"
                    >
                      <ButtonTextIcon
                        customize="text-xs rounded-2xl px-2 pb-0.5"
                        Text="Shop Now"
                        Icon={
                          <ShoppingCartOutlined
                            sx={{ fontSize: "12px" }}
                            style={{ stroke: "#000", strokeWidth: "0.1" }}
                          />
                        }
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="absolute animate-spin duration-1000 top-0 right-0">
              <StarSvg width="30" fill={""} />
            </div>
            <div className="absolute animate-spin duration-1000 top-0 left-0">
              <WheelSvg width="30" fill={""} />
            </div>
            <div className="absolute animate-spin duration-1000 bottom-0 right-0">
              <FlowerSvg width="30" fill={""} />
            </div>
            <div className="absolute animate-spin duration-1000 bottom-0 left-0">
              <PriceSvg width="25" fill={""} />
            </div>
          </div>
          <div className="absolute -bottom-full z-40 right-1 purchased__card__bill">
            <div className="bg-white text-black shadow-md font-medium text-sm p-2 border border-gray-300 w-40">
              <div className="flex justify-between items-center uppercase">
                <span className="flex items-center gap-1">
                  {" "}
                  <span className="animate-spin duration-1000">
                    <WheelSvg width="10" fill="black" />
                  </span>{" "}
                  Amorée
                </span>
                <span className="">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="text-center">
                <div className="text-base">-------------------------</div>
                <p className="leading-[4px] font-semibold">** Zynor **</p>
                <div className="text-base">-------------------------</div>
              </div>
              <div className="mt-1.5">
                <p className="uppercase text-[11px] leading-[15px]">
                  fruity, citrusy & sweet
                </p>
                <p>
                  Volume:{" "}
                  <span className="font-semibold uppercase dancing_script text-[9px] leading-[13px]">
                    50ml pérfum
                  </span>
                </p>
              </div>
              <div className="mt-1">
                <span>TOTAL:</span>
                <span className="pl-1.5 font-bold obviously text-[9px] leading-[13px]">
                  * 1649 Rs!
                </span>
              </div>
              <div className="mt-0.5 text-center">
                <div className="text-base">*********************</div>
                <p className="leading-[4px]">Thanks for your visit!</p>
                <div className="text-base">-------------------------</div>
                <Image
                  src={'/images/svgs/bar code.svg'}
                  width={300}
                  height={1000}
                  alt="bar code"
                  className="-mt-0.5"
                />
                <div className="text-base -mt-1.5">
                  -------------------------
                </div>
                <p className="uppercase">Reviews & Ratings:</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-bold">(9999)</span>
                  <ProductRating ratings={5} size="small" />
                </div>
                <div className="text-base -mt-1.5">
                  -------------------------
                </div>
                <p className="uppercase leading-[9px]">GENERAL INQUIRIES:</p>
                <a
                  href="mailto:amoreescents@gmail.com"
                  className="underline underline-offset-4"
                >
                  amoréescents@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="absolute animate-spin duration-1000 top-1/2 left-20">
              <StarStrokeSvg width="40" fill={""} />
            </div>
            <div className="absolute animate-spin duration-1000 top-1/2 right-20">
              <PriceSvg width="30" fill={""} />
            </div>
          </div>
        </section>
    );
}

export default Purchased