'use client'
import React from 'react'
import ClientLogic from './ClientLogic';
import Cursor from '@/cursor/Cursor';
import CustomCtxMenu from './CustomCtxMenu';
import SoftMusic from '@/components/global/audio/SoftMusic';
import ClickSound from '@/components/global/audio/ClickSound';

const LayoutClientComponents = () => {
  return (
    <section>
      <ClientLogic />
      <Cursor />
      {/* <CustomCtxMenu /> */}
      <SoftMusic />
      <ClickSound />
    </section>
  );
}

export default LayoutClientComponents