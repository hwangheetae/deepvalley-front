import { FC, useEffect } from 'react';
import LoadingSpinner from '../../../../../components/Common/LoadingSpinner';
import useKakaoLoginMutation from '../../../../../queries/useKakaoLoginMutation';

const SocialKakaoRedirectPage: FC = () => {
  const code = new URL(window.location.href).searchParams.get('code');

  const mutation = useKakaoLoginMutation();

  const fetchData = () => {
    if (!code) return;
    mutation.mutate(code);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (mutation.isPending) return <LoadingSpinner />;
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
};

export default SocialKakaoRedirectPage;
