import Layout from '../../components/Common/Layout';
import MainPageHeader from '../../components/Common/MainPageHeader';
import TapBar from '../../components/Common/TapBar';
import Carousel from '../../components/Common/Carousel';
import Category from '../../components/Common/Category';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FC, useEffect } from 'react';
import { getUser } from '../../api/User';
import { useMe } from '../../stores/meStore';
import { 에러404, 서버오류, 잘못된요청 } from '../../constant/constant';
import useErrorToast from '../../hooks/useErrorToast';
import { RecommendReview } from '../../components/Common';

const HomePage: FC = () => {
  const { updateMe } = useMe();
  const { errorToast } = useErrorToast();
  const userResponse = async () => {
    try {
      const response = await getUser();
      if (response.status === 200) {
        const fetchData = {
          created_date: response.data.created_date,
          description: response.data.description,
          login_email: response.data.login_email,
          name: response.data.name,
          profile_image_url: response.data.profile_image_url,
        };
        updateMe(fetchData);
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        errorToast(잘못된요청);
      }
      if (err.response.status === 404) {
        errorToast(에러404);
      }
      if (err.response.status === 500) {
        errorToast(서버오류);
      }
    }
  };

  useEffect(() => {
    userResponse();
  }, []);
  return (
    <Layout hasHeader={true} hasTapBar={true}>
      <MainPageHeader
        title="깊은산 골짜기"
        fontFamily="Cafe24Ssurround"
        showMenuButton={false}
      />

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
    </Layout>
  );
};
export default HomePage;
