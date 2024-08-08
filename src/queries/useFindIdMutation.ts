import { useMutation } from '@tanstack/react-query';
import useErrorToast from '../hooks/useErrorToast';
import { 잘못된요청, 에러404, 서버오류 } from '../constant/constant';
import { findId } from '../api/Auth/AuthService';

const useFindIdMutation = (onSuccessCallback: (data: any) => void) => {
  const { errorToast } = useErrorToast();

  return useMutation({
    mutationFn: findId,
    onSuccess: (response) => {
      onSuccessCallback(response.data);
    },
    onError: (err: any) => {
      if (err.response?.status === 400) {
        errorToast(잘못된요청);
      }
      if (err.response?.status === 404) {
        errorToast(에러404);
      }
      if (err.response?.status === 500) {
        errorToast(서버오류);
      }
    },
  });
};
export default useFindIdMutation;
