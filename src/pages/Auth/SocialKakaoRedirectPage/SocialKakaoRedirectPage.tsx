import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import config from '../../../config';

const SocialKakaoRedirectPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
          const response = await axios.post(
            /*카카오 소셜 로그인 백엔드  API */ '',
            {
              code,
            },
          );
          localStorage.setItem('token', response.data.token);
          navigate('/');
        }
      } catch (error) {
        console.error('로그인 실패', error);
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);
  return <div>로그인 중...</div>;
};

export default SocialKakaoRedirectPage;
