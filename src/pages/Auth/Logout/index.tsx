import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../../../api/Auth/AuthService';
import { useAuthStore } from '../../../stores/authStore';
import useSuccessToast from '../../../hooks/useSuccessToast';
import { useMe } from '../../../stores/meStore';
import { useQueryClient } from '@tanstack/react-query';

const Logout = () => {
  const navigate = useNavigate();
  const setIsLoggedOut = useAuthStore((state) => state.setIsLoggedOut);
  const { successToast } = useSuccessToast();
  const { reset } = useMe.getState();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['RememberMe'] });
    logout();
    reset();
    setIsLoggedOut(true);
    successToast({
      title: '로그아웃 성공!',
      description: `성공적으로 로그아웃 하였습니다.`,
    });
    navigate('/');
  }, []);

  return <div></div>;
};

export default Logout;
