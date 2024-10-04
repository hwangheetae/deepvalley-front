import Layout from '../../components/Common/Layout';
import TapBar from '../../components/Common/TapBar';
import Carousel from '../../components/Common/Carousel';
import Category from '../../components/Common/Category';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { FC, useEffect } from 'react';
import { getUser } from '../../api/User';
import { useMe } from '../../stores/meStore';
import { RecommendReview } from '../../components/Common';
import { useQuery } from '@tanstack/react-query';
import { logout } from '../../api/Auth/AuthService';
import { useNavigate } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import { AxiosError } from 'axios';
import { MainPageHeader } from '../../components/Common';
import { Helmet } from 'react-helmet-async';

const HomePage: FC = () => {
  const { me, updateMe } = useMe();
  const navigate = useNavigate();
  const { isError, data, error } = useQuery({
    queryKey: ['RememberMe'],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  useEffect(() => {
    if (data?.data && !isEqual(data.data, me)) {
      updateMe(data?.data);
    }
  }, [data?.data, me, updateMe]);

  if (isError) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      logout();
      navigate('/errorPage');
    }
  }

  return (
    <>
      <Helmet>
        <title>깊은산골짜기 | 내 주변 계곡을 찾아보세요</title>
        <meta
          name="description"
          content="내 주변 계곡의 위치를 찾고, 정보를 얻고, 추억을 공유하세요"
        />
        <meta
          name="keywords"
          content="깊은산골짜기, 계곡, 여행, 자연, 리뷰, deep valley, 커뮤니티, korea, Valley, 캠핑, 글램핑, 차박"
        />
        <meta
          property="og:title"
          content="깊은산골짜기 | 내 주변 계곡을 찾아보세요"
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
      <Layout hasHeader={true} showMenuButton={true}>
        <MainPageHeader
          title="깊은산골짜기"
          fontFamily="Cafe24Ssurround"
          showMenuButton={true}
        />
        <InputGroup
          onClick={() => {
            navigate('/search');
          }}
        >
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="black" />}
          />
          <Input
            placeholder="지역을 입력하세요"
            size="md"
            borderRadius="full"
            boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
            bg="white"
          />
        </InputGroup>
        <Category />
        <Carousel />
        <RecommendReview />
        <TapBar />
      </Layout>
    </>
  );
};
export default React.memo(HomePage);
