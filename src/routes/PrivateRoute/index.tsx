// routes/PrivateRoute/index.tsx
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAuthStore((state) => state.user);
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      toast({
        title: '로그인 필요',
        description: '로그인을 해주세요!',
        status: 'warning',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    }
  }, [user, toast]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
