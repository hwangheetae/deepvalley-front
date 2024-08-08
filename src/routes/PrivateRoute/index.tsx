// routes/PrivateRoute/index.tsx
import { Navigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { FC, useEffect, ReactNode } from 'react';
import { useAuthStore } from '../../stores/authStore';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const toast = useToast();
  const accessToken = sessionStorage.getItem('token');
  const isLoggedOut = useAuthStore((state) => state.isLoggedOut);

  useEffect(() => {
    if (!accessToken && !isLoggedOut) {
      toast({
        title: '로그인 필요',
        description: '로그인을 해주세요!',
        status: 'warning',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    }
  }, [accessToken, isLoggedOut]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
