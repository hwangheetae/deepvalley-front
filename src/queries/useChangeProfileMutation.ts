import { useMutation } from '@tanstack/react-query';
import { changeProfile } from '../api/User';
import { useNavigate } from 'react-router-dom';
import useSuccessToast from '../hooks/useSuccessToast';
import useErrorToast from '../hooks/useErrorToast';
import { 잘못된요청, 에러404, 서버오류 } from '../constant/constant';
import { useMe } from '../stores/meStore';
import { logout } from '../api/Auth/AuthService';
const useChangeProfileMutation = (imgFile: string) => {
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();
  const { updateMe } = useMe();

  return useMutation({
    mutationFn: changeProfile,
    onSuccess: (values) => {
      updateMe({
        ...values,
        profile_image_url: imgFile,
      });
      successToast({
        title: '프로필 변경 성공!',
        description: `프로필을 변경하였습니다.`,
      });
      navigate('/');
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

export default useChangeProfileMutation;
