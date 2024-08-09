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
    <Layout hasHeader={true} hasTapBar={false} showMenuButton={true}>
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
  );
};
export default React.memo(HomePage);
