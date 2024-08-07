import Layout from '../../components/Common/Layout';
import TapBar from '../../components/Common/TapBar';
import Carousel from '../../components/Common/Carousel';
import Category from '../../components/Common/Category';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { FC, useEffect } from 'react';
import { getUser } from '../../api/User';
import { useMe } from '../../stores/meStore';
import { 서버오류 } from '../../constant/constant';
import useErrorToast from '../../hooks/useErrorToast';
import { RecommendReview } from '../../components/Common';
import { useQuery } from '@tanstack/react-query';
import { logout } from '../../api/Auth/AuthService';
import { useNavigate } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import { AxiosError } from 'axios';

const HomePage: FC = () => {
  const { me, updateMe } = useMe();
  const { errorToast } = useErrorToast();
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
  }, [data?.data]);

  if (isError) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 403) {
      logout();
      navigate('/errorPage');
    }
  }

  return (
    <Layout hasHeader={true} hasTapBar={true} showMenuButton={true}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="black" />}
        />
        <Input
          placeholder="지역을 입력하세요"
          size="md"
          borderRadius="full"
          boxShadow="md"
          bg="white"
        />
      </InputGroup>
      <Category />
      <Carousel />
      <RecommendReview />
      <TapBar />
      <div></div>
    </Layout>
  );
};
export default React.memo(HomePage);
