'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/utils/Loader/Loader';
import MetaData from '@/utils/Meta/MetaData';
import { clearErrors, forgetPassword } from '@/store/actions/userAction';
import ButtonTextIcon from '@/components/global/Buttons/ButtonTextIcon';

const ForgetPassword = () => {

    const dispatch = useDispatch();
    

    const { error, loading, message } = useSelector(state => state.forgetPassword);

    const [email, setEmail] = useState('');

    const emailSubmit = (e) => {
        e.preventDefault();
        dispatch(forgetPassword({ email }));
    };

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message);
            toast.warning('Don\'t share your password reset link with anyone.');
        }

    }, [dispatch, toast, error, message]);

    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <MetaData title="Forget Password" />
            <section className="flex justify-center items-center h-screen w-full mt-24">
              <div
                className={`bg-gray-200 shadow_black_1 w-full max-w-2xl rounded-lg py-6 flex justify-center items-center flex-col`}
              >
                <h1 className="text-3xl font-bold mb-4 text-center">
                  Forget Password
                </h1>
                <form
                  action="/forgetPassword"
                  method="post"
                  onSubmit={emailSubmit}
                >
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type="email"
                    name="email"
                    placeholder="email"
                  />
                  <div className="mt-10">
                    <ButtonTextIcon
                      btnType="submit"
                      Text="Send"
                      customize="px-4 py-2 transition-all duration-1000 md:w-[60%] w-full mx-auto hover:rounded-full"
                      Icon={<i className="ri-send-plane-line text-lg"></i>}
                    />
                  </div>
                </form>
              </div>
            </section>
          </>
        )}
      </>
    );
}

export default ForgetPassword