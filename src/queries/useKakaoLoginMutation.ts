import useErrorToast from '../hooks/useErrorToast';
import useSuccessToast from '../hooks/useSuccessToast';
import { useMutation } from '@tanstack/react-query';
import { 서버오류 } from '../constant/constant';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginSendToken } from '../api/Auth/AuthService';

const useKakaoLoginMutation = () => {
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();
  return useMutation({
    mutationFn: kakaoLoginSendToken,
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.access_token);
      successToast({
        title: '로그인 성공!',
        description: '로그인에 성공하였습니다.',
      });
      // navigate('/');
    },
    onError: (err: any) => {
      errorToast(서버오류);
      console.log(err);
      // navigate('/login');
    },
  });
};

export default useKakaoLoginMutation;
