import Image from 'next/image'
import React from 'react'

const HeroLine = ({ title, src }) => {

    return (
        <>
            <div className="hero_row_elem flex items-center gap-7">
                <h1 className='text-7xl neue_machina_regular'>{title}</h1>
                <div className='img_div w-[3.5rem] h-[3.5rem] relative rounded-full overflow-hidden'>
                    <Image fill className='w-full h-full object-cover object-center' src={src} alt={title} />
                </div>
            </div>
        </>
    )
}

export default HeroLine