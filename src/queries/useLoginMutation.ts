import { useMutation } from '@tanstack/react-query';
import { login } from '../api/Auth/AuthService';
import { useNavigate } from 'react-router-dom';
import useSuccessToast from '../hooks/useSuccessToast';
import useErrorToast from '../hooks/useErrorToast';
import {
  잘못된요청,
  잘못된비밀번호,
  에러404,
  서버오류,
} from '../constant/constant';

const useLoginMutation = () => {
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      sessionStorage.setItem('token', response.data.access_token);
      navigate('/');
      successToast({
        title: '로그인 성공!',
        description: '로그인에 성공하였습니다.',
      });
    },
    onError: (err: any) => {
      if (err.response.status === 400) {
        errorToast(잘못된요청);
      }
      if (err.response.status === 401) {
        errorToast(잘못된비밀번호);
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
export default useLoginMutation;
