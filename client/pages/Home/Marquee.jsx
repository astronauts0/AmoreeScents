import React from 'react';
import WheelSvg from '@/components/svgs/WheelSvg';
import FlowerSvg from '@/components/svgs/FlowerSvg';
import PriceSvg from '@/components/svgs/PriceSvg';
import WheelStrokeSvg from '@/components/svgs/StarStrokeSvg';

const Marquee = ({ marqueeRef }) => {

    return (
            <section ref={marqueeRef} className="marquee_wrapper overflow-hidden h-screen italic mx-auto flex justify-center items-center relative w-full" >
                <div
                    id="direction"
                    className="h-full flex flex-col justify-evenly items-center md:justify-center"
                >
                    <h1 className="text-4xl uppercase leading-none whitespace-nowrap md:text-5xl my-4 sm:my-2 xs:text-3xl">
                        <span
                            data-scroll
                            data-scroll-direction="horizontal"
                            data-scroll-speed="8"
                            className="bg-gray-100 px-4 py-2 block"
                        >
                            Elegance in Every Drop
                        </span>
                    </h1>
                    <h1 className="dancing_script text-4xl uppercase leading-none whitespace-nowrap md:text-5xl my-4 sm:my-2 xs:text-3xl"
                        data-scroll
                        data-scroll-speed="-2"
                    >
                        <span
                            data-scroll
                            data-scroll-direction="vertical"
                            data-scroll-speed="-6"
                            className="bg-gray-100 px-4 py-2 block"
                        >
                            A Scent That Defines You
                        </span>
                    </h1>
                    <h1 className="Havelock_Medium text-4xl uppercase leading-none whitespace-nowrap md:text-5xl my-4 sm:my-2 xs:text-3xl">
                        <span
                            data-scroll
                            data-scroll-direction="horizontal"
                            data-scroll-speed="6"
                            className="bg-gray-100 px-4 py-2 block"
                        >
                            Crafted for Timeless Moments
                        </span>
                    </h1>
                    <h1 className="satoshi_medium text-4xl uppercase leading-none whitespace-nowrap md:text-5xl my-4 sm:my-2 xs:text-3xl">
                        <span
                            data-scroll
                            data-scroll-direction="horizontal"
                            data-scroll-speed="-4"
                            className="bg-gray-100 px-4 py-2 block"
                        >
                            Awaken Your Senses
                        </span>
                    </h1>
                    <h1 className="neue_machina_regular text-4xl uppercase leading-none whitespace-nowrap md:text-5xl my-4 sm:my-2 xs:text-3xl"
                        data-scroll
                        data-scroll-speed="6"
                    >
                        <span
                            data-scroll
                            data-scroll-direction="horizontal"
                            data-scroll-speed="6"
                            className="bg-gray-100 px-4 py-2 block"
                        >
                            The Essence of Perfection
                        </span>
                    </h1>
                </div>
                <div>
                    <div className="absolute animate-spin duration-1000 top-5 left-5 z-[60]">
                        <WheelSvg width='30' fill={''} />
                    </div>
                    <div className="absolute animate-spin duration-1000 top-5 right-5 z-[60]">
                        <WheelStrokeSvg width='40' fill={''} />
                    </div>
                    <div className="absolute animate-spin duration-1000 bottom-5 left-5 z-[60]">
                        <FlowerSvg width='30' fill={''} />
                    </div>
                    <div className="absolute animate-spin duration-1000 bottom-5 right-5 z-[60]">
                        <PriceSvg width='30' fill={''} />
                    </div>
                </div>
            </section>
    );
};

export default Marquee;