'use client'
import isAuth from '@/Auth/isAuth';
import ButtonTextIcon from '@/components/global/Buttons/ButtonTextIcon';
import HeaderButton from '@/components/global/Buttons/HeaderButton';
import Rain from '@/components/global/Rain/Rain';
import MetaData from '@/utils/Meta/MetaData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {

  const { loading, user } = useSelector(state => state.user);

  return (
    <>
      <MetaData title="Profile" />
      {
        loading ? <Loader /> : (
          <>
            <section className="profile relative flex justify-center items-center h-screen w-full py-6">
              <Rain />
              <div className={`bg-gray-200 shadow_black_1 w-full max-w-md rounded-lg p-6 flex justify-center items-center flex-col relative z-10 mx-3`}>

                <div className="relative w-fit ">
                  <Link href="/profile/update">
                    <span
                      className="w-9 h-9 cursor-pointer absolute z-30 flex justify-center items-center bottom-0 right-0 rounded-full bg-white">
                      <i className="text-zinc-800 ri-pencil-fill text-xl animate-spin"></i>
                    </span>
                  </Link>
                  <div className="w-32 h-32 rounded-full ">
                    <Image fill className='rounded-full border border_color' src={user?.avatar?.url||'/images/user.png'} alt="profileImage" />
                  </div>
                </div>

                <div className="space-y-2 mt-7">
                  <div className="flex items-center">
                    <h1 className="text-lg font-semibold pr-7">Name:</h1>
                    <p className="text-lg capitalize satoshi_medium">{user?.name}</p>
                  </div>
                  <div className="flex items-start">
                    <h1 className="text-lg font-semibold pr-7">Email:</h1>
                    <p className="text-lg break-all satoshi_medium">{user?.email}</p>
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-lg font-semibold pr-7">Joined on:</h1>
                    <p className="text-lg obviously">{String(user?.createdAt).substr(0, 10)}</p>
                  </div>
                  <div className="flex items-center gap-x-7 justify-center pt-5">
                    <Link href="/orders" className="">
                      <HeaderButton Icon={<i className="ri-shopping-bag-4-line text-xl"></i>} />
                    </Link>
                    <Link href="/password/update" className="">
                      <ButtonTextIcon Text='Change Password' customize="px-2.5 py-1 text-xs transition-all rounded-sm duration-1000 hover:rounded-full" Icon={<i className="ri-lock-2-line text-lg"></i>} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

          </>
        )
      }
    </>
  )
}

export default isAuth(Profile)