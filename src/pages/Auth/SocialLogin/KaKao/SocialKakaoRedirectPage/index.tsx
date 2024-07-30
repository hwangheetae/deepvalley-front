import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginSendToken } from '../../../../../api/Auth/AuthService';
import { 서버오류 } from '../../../../../constant/constant';
import useErrorToast from '../../../../../hooks/useErrorToast';
import useSuccessToast from '../../../../../hooks/useSuccessToast';
import { useMutation } from '@tanstack/react-query';
const SocialKakaoRedirectPage: FC = () => {
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();

  const code = new URL(window.location.href).searchParams.get('code');

  const mutation = useMutation({
    mutationFn: kakaoLoginSendToken,
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.access_token);
      successToast('로그인 성공!', '로그인에 성공하였습니다.');
      navigate('/');
    },
    onError: () => {
      errorToast(서버오류);
      navigate('/login');
    },
  });

  const fetchData = () => {
    if (!code) return;
    mutation.mutate(code);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const code = new URL(window.location.href).searchParams.get('code');
  //         if (code) {
  //           const response = await kakaoLoginSendToken(code);
  //           if (response.status === 200) {
  //             localStorage.setItem('token', response.data.access_token);
  //             successToast('로그인 성공!', '로그인에 성공하였습니다.');
  //             navigate('/');
  //           }
  //         }
  //       } catch (err: any) {
  //         if (err.response.status === 500) {
  //           errorToast(서버오류);
  //           navigate('/login');
  //         }
  //       }
  //     };
  //     fetchData();
  //   }, []);
  //   return <div>로그인 중...</div>;
  // };

  return <div>{mutation.isPending ? 'kakao login 중' : <></>}</div>;
};

export default SocialKakaoRedirectPage;
