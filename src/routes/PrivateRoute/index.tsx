// routes/PrivateRoute/index.tsx
import { Navigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const toast = useToast();
  const accessToken = localStorage.getItem('token');
  useEffect(() => {
    if (!accessToken) {
      toast({
        title: '로그인 필요',
        description: '로그인을 해주세요!',
        status: 'warning',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    }
  }, [accessToken, toast]);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
