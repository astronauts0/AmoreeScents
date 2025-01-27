'use client'
import Loader from '@/utils/Loader/Loader';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const isAuth = (WrappedComponent, isAdmin = false) => {
    return (props) => {
        const router = useRouter();
        const { user, isAuthenticated, loading } = useSelector((state) => state.user);

        if (loading) return <Loader />;

        if (!isAuthenticated || (isAdmin && user.role !== 'admin')) {
            // router.push('/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default isAuth;
