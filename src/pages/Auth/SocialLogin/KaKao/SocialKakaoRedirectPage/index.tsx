import { FC } from 'react';
import LoadingSpinner from '../../../../../components/Common/LoadingPage';
import { useQuery } from '@tanstack/react-query';
import { kakaoLoginSendToken } from '../../../../../api/Auth/AuthService';
import useSuccessToast from '../../../../../hooks/useSuccessToast';
import { useNavigate } from 'react-router-dom';
import useErrorToast from '../../../../../hooks/useErrorToast';
import { 서버오류 } from '../../../../../constant/constant';
const SocialKakaoRedirectPage: FC = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const { successToast } = useSuccessToast();
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();
  const { isPending, isError, data } = useQuery({
    queryKey: ['kakaoLogin', code],
    queryFn: () => kakaoLoginSendToken(code as string),
    enabled: !!code,
  });

  if (data) {
    sessionStorage.setItem('token', data.data.access_token);
    successToast({
      title: '로그인 성공!',
      description: '로그인에 성공하였습니다.',
    });
    navigate('/');
  }

  if (isPending) return <LoadingSpinner />;

  if (isError) {
    errorToast(서버오류);
    navigate('/login');
  }
};

export default SocialKakaoRedirectPage;
