'use client'
import React from 'react'
import ClientLogic from './ClientLogic';
import Cursor from '@/cursor/Cursor';
import CustomCtxMenu from './CustomCtxMenu';
import SoftMusic from '@/components/global/audio/SoftMusic';
import ClickSound from '@/components/global/audio/ClickSound';
import Link from 'next/link';

const LayoutClientComponents = () => {

  return (
    <section>
      <Link href="/reviews" className="see_reviews">★ Reviews</Link>
      <ClientLogic />
      <Cursor />
      <CustomCtxMenu />
      <SoftMusic />
      <ClickSound />
    </section>
  );
}

export default LayoutClientComponents