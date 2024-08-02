import { useMutation } from '@tanstack/react-query';
import { register } from '../api/Auth/AuthService';
import { useNavigate } from 'react-router-dom';
import useSuccessToast from '../hooks/useSuccessToast';
import useErrorToast from '../hooks/useErrorToast';
import {
  잘못된요청,
  이미존재하는이메일입니다,
  이메일이중복되었어요,
  닉네임이중복되었어요,
  이미존재하는닉네임입니다,
  서버오류,
} from '../constant/constant';

const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/login');
      successToast({
        title: '회원가입 성공!',
        description: '회원가입에 성공하였습니다.',
      });
    },
    onError: (err: any) => {
      if (err.response.status === 400) {
        errorToast(잘못된요청);
      }
      if (err.response.status === 409) {
        if (err.response.data === 이메일이중복되었어요) {
          errorToast(이미존재하는이메일입니다);
        }
        if (err.response.data === 닉네임이중복되었어요) {
          errorToast(이미존재하는닉네임입니다);
        }
      }
      if (err.response.status === 500) {
        errorToast(서버오류);
      }
    },
  });
};
export default useRegisterMutation;
