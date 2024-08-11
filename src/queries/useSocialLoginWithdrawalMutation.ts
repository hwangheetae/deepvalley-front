import { useMutation } from '@tanstack/react-query';
import { socalLoginWithdrawal } from '../api/User';
import { useNavigate } from 'react-router-dom';
import useErrorToast from '../hooks/useErrorToast';
import { 서버오류 } from '../constant/constant';
import { logout } from '../api/Auth/AuthService';
const useSocialLoginWithdrawalMutation = () => {
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();

  return useMutation({
    mutationFn: socalLoginWithdrawal,
    onSuccess: (response) => {
      console.log(response);
      navigate('/WithdrawalSuccessPage');
    },
    onError: (err: any) => {
      if (err.response.status === 403) {
        logout();
        navigate('/errorpage');
      }
      if (err.response.status === 500) {
        errorToast(서버오류);
      }
    },
  });
};

export default useSocialLoginWithdrawalMutation;
