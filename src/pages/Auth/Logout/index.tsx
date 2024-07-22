import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../../../api/Auth/AuthService';
import { useAuthStore } from '../../../stores/authStore';
const Logout = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const setIsLoggedOut = useAuthStore((state) => state.setIsLoggedOut);

  useEffect(() => {
    logout();
    setIsLoggedOut(true);
    toast({
      title: '로그아웃 성공!',
      description: `성공적으로 로그아웃 하였습니다.`,
      status: 'success',
      position: 'top-right',
      isClosable: true,
      duration: 5000,
    });
    navigate('/');
  }, [setIsLoggedOut]);

  return <div></div>;
};

export default Logout;
