import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../../../api/Auth/AuthService';
import { useAuthStore } from '../../../stores/authStore';
import useSuccessToast from '../../../hooks/useSuccessToast';

const Logout = () => {
  const navigate = useNavigate();
  const setIsLoggedOut = useAuthStore((state) => state.setIsLoggedOut);
  const { successToast } = useSuccessToast();
  useEffect(() => {
    logout();
    setIsLoggedOut(true);
    successToast('로그아웃 성공!', `성공적으로 로그아웃 하였습니다.`);
    navigate('/');
  }, []);

  return <div></div>;
};

export default Logout;
