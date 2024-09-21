import IntroPageOne from '../IntroPageOne';
import IntroPageTwo from '../IntroPageTwo';
import IntroPageThree from '../IntroPageThree';
import IntroPageFour from '../IntroPageFour';
import IntroPageFive from '../IntroPageFive';
import { Helmet } from 'react-helmet-async';
const IntroPageTotal = () => {
  return (
    <>
      <Helmet>
        <title>깊은산 골짜기 | 계곡 가고 싶을 땐? 깊은산 골짜기!</title>
        <link
          rel="canonical"
          href="https://djw9hdrinhwdq.cloudfront.net/intro"
        />
        <meta
          name="description"
          content="내 주변 계곡의 위치를 찾고, 정보를 얻고, 추억을 공유하세요"
        />
        <meta
          name="keywords"
          content="깊은산 골짜기, 계곡, 여행, 자연, 리뷰, deep valley, 커뮤니티, korea, Valley, 캠핑, 글램핑, 차박"
        />
        <meta
          property="og:title"
          content="깊은산 골짜기 | 계곡 가고 싶을 땐? 깊은산 골짜기!"
        />
        <meta
          property="og:description"
          content="내 주변 계곡의 위치를 찾고, 정보를 얻고, 추억을 공유하세요"
        />
        <meta
          property="og:url"
          content="https://djw9hdrinhwdq.cloudfront.net/"
        />
        <meta
          property="og:image"
          content="https://djw9hdrinhwdq.cloudfront.net/preview-image.jpg"
        />
        <meta property="og:type" content="website" />
        <meta
          name="google-site-verification"
          content="oznRSXGSvmGJnSJtsS_h_fp1vCkcIU8AqlSFkglYFy8"
        />
      </Helmet>
      <IntroPageOne />
      <IntroPageTwo />
      <IntroPageThree />
      <IntroPageFour />
      <IntroPageFive />
    </>
  );
};

export default IntroPageTotal;
