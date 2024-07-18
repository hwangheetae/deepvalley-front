import Layout from '../components/Common/Layout';
import MainPageHeader from '../components/Common/MainPageHeader';
import TapBar from '../components/Common/TapBar';
import Carousel from '../components/Common/Carousel';
import Category from '../components/Common/Category';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const HomePage = () => {
  //tailwind test
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
        <Carousel title="캐러셀" id="NO" fetchUrl="movie/now_playing" />
        <Carousel title="추천계곡" id="RECOMEND" fetchUrl="movie/now_playing" />
        <TapBar />
      </Layout>
    </div>
  );
};

export default HomePage;
