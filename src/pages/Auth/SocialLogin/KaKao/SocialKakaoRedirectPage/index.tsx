import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginSendToken } from '../../../../../api/Auth/AuthService';
import { useToast } from '@chakra-ui/react';
import { KAKAO_AUTH_ERROR_MESSAGE } from '../../../../../constant/constant';

const SocialKakaoRedirectPage: FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
          const response = await kakaoLoginSendToken(code);
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem('token', response.data.access_token);
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
        console.log(err);
        if (err.response.status === 500) {
          toast({
            title: '에러!',
            description: `${KAKAO_AUTH_ERROR_MESSAGE}`,
            status: 'error',
            position: 'top-right',
            isClosable: true,
            duration: 5000,
          });
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [navigate]);
  return <div>로그인 중...</div>;
};

export default SocialKakaoRedirectPage;
