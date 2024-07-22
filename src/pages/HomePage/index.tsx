import Layout from '../../components/Common/Layout';
import MainPageHeader from '../../components/Common/MainPageHeader';
import TapBar from '../../components/Common/TapBar';
import Carousel from '../../components/Common/Carousel';
import Category from '../../components/Common/Category';
import {
  InputGroup,
  InputLeftElement,
  Input,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FC, useEffect, useState } from 'react';
import { getUser } from '../../api/User';
import { useMe } from '../../stores/meStore';
import {
  INVALID_REUEST_BODY_MESSAGE,
  ERROR_MESSAGE_404,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from '../../constant/constant';
const HomePage: FC = () => {
  useEffect(() => {
    userResponse();
  }, []);
  const [error, setError] = useState('');
  const toast = useToast();

  const userResponse = async () => {
    try {
      const response = await getUser();
      if (response.status === 200) {
        console.log(response);
        const fetchData = {
          created_date: response.data.created_date,
          description: response.data.description,
          login_email: response.data.login_email,
          name: response.data.name,
          profile_image_url: response.data.profile_image_url,
        };

        updateMe(fetchData);
        localStorage.setItem('RememberMe', JSON.stringify(fetchData));
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        setError(INVALID_REUEST_BODY_MESSAGE);
      }
      if (err.response.status === 404 || err.response.status === 403) {
        setError(ERROR_MESSAGE_404);
      }
      if (err.response.status === 500) {
        setError(INTERNAL_SERVER_ERROR_MESSAGE);
      }
      toast({
        title: '에러!',
        description: `${error}`,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    }
  };

  const { updateMe } = useMe();

  return (
    <div>
      <Layout hasHeader={true} hasTapBar={true}>
        <MainPageHeader
          title="깊은산 골짜기"
          fontFamily="Cafe24Ssurround"
          showMenuButton={true}
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
        <TapBar />
      </Layout>
    </div>
  );
};

export default HomePage;
