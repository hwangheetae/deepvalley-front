import kakao_login_medium_narrow from '../../../../assets/images/kakao_login_medium_narrow.webp';
import config from '../../../../config';

const SocialKakao = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${config.KAKAO_REST_API_KEY}&redirect_uri=${config.KAKAO_REDIRECT_URL}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  //인가코드 추출
  const code = new URL(window.location.href).searchParams.get('code');
  return (
    <>
      <button onClick={handleLogin}>
        <img
          src={kakao_login_medium_narrow}
          alt="카카오 로그인"
          style={{ width: '46px' }}
        ></img>
      </button>
    </>
  );
};
export default SocialKakao;
