import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginSendToken } from '../../../../../api/Auth/AuthService';
import { KAKAO_AUTH_ERROR_MESSAGE } from '../../../../../constant/constant';
import useHandleError from '../../../../../hooks/useHandleError';
import useSuccessToast from '../../../../../hooks/useSuccessToast';
const SocialKakaoRedirectPage: FC = () => {
  const navigate = useNavigate();
  const { handleError } = useHandleError();
  const { successToast } = useSuccessToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
          const response = await kakaoLoginSendToken(code);
          if (response.status === 200) {
            localStorage.setItem('token', response.data.access_token);
            successToast('로그인 성공!', '로그인에 성공하였습니다.');
            navigate('/');
          }
        }
      } catch (err: any) {
        if (err.response.status === 500) {
          handleError(KAKAO_AUTH_ERROR_MESSAGE);
          navigate('/login');
        }
      }
    };
    fetchData();
  }, []);
  return <div>로그인 중...</div>;
};

export default SocialKakaoRedirectPage;
