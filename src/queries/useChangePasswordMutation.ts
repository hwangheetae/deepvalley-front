import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../api/User';
import { useNavigate } from 'react-router-dom';
import useSuccessToast from '../hooks/useSuccessToast';
import useErrorToast from '../hooks/useErrorToast';
import {
  잘못된요청,
  잘못된비밀번호,
  에러404,
  서로같은비밀번호설정,
  서버오류,
} from '../constant/constant';

const useChangePasswordMutation = () => {
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      successToast({
        title: '비밀번호 변경 성공!',
        description: `비밀번호를 변경하였습니다.`,
      });
      navigate('/');
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
      if (err.response.status === 422) {
        errorToast(서로같은비밀번호설정);
      }
      if (err.response.status === 500) {
        errorToast(서버오류);
      }
    },
  });
};
export default useChangePasswordMutation;
