import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginSendToken } from '../../../../../api/Auth/AuthService';
import { useToast } from '@chakra-ui/react';
import { KAKAO_AUTH_ERROR_MESSAGE } from '../../../../../constant/constant';
import useHandleError from '../../../../../hooks/useHandleError';
const SocialKakaoRedirectPage: FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { handleError } = useHandleError();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
          const response = await kakaoLoginSendToken(code);
          if (response.status === 200) {
            localStorage.setItem('token', response.data.access_token);
            console.log('카카오 로그인중!');
            toast({
              title: '로그인 성공!',
              description: `로그인에 성공하였습니다.`,
              status: 'success',
              position: 'top-right',
              isClosable: true,
              duration: 5000,
            });
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
