import { useMutation } from '@tanstack/react-query';
import useErrorToast from '../hooks/useErrorToast';
import { 잘못된요청, 에러404, 서버오류 } from '../constant/constant';
import { findId } from '../api/Auth/AuthService';

const useFindIdMutation = () => {
  const { errorToast } = useErrorToast();

  return useMutation({
    mutationFn: findId,
    onSuccess: (response) => {
      // 성공 시 필요한 로직 추가
      console.log(response.data);
    },
    onError: (err: any) => {
      if (err.response?.status === 400) {
        errorToast(잘못된요청);
      } else if (err.response?.status === 404) {
        errorToast(에러404);
      } else if (err.response?.status === 500) {
        errorToast(서버오류);
      } else {
        // 기타 에러 처리
        console.error(err);
      }
    },
  });
};
export default useFindIdMutation;
