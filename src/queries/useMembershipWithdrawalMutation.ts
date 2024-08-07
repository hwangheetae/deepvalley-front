import { useMutation } from '@tanstack/react-query';
import { membershipWithdrawal } from '../api/User';
import { useNavigate } from 'react-router-dom';
import useErrorToast from '../hooks/useErrorToast';
import { 잘못된요청, 에러404, 서버오류 } from '../constant/constant';
import { logout } from '../api/Auth/AuthService';
const useMembershipWithdrawalMutation = () => {
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();

  return useMutation({
    mutationFn: membershipWithdrawal,
    onSuccess: () => {
      navigate('/WithdrawalSuccessPage');
    },
    onError: (err: any) => {
      if (err.response.status === 400) {
        errorToast(잘못된요청);
      }
      if (err.response.status === 403) {
        logout();
        navigate('/errorpage');
      }
      if (err.response.status === 404) {
        errorToast(에러404);
      }
      if (err.response.status === 500) {
        errorToast(서버오류);
      }
    },
  });
};

export default useMembershipWithdrawalMutation;
