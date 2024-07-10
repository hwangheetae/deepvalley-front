import CommonButton from './components/Common/Button/CommonButton';
import { Box } from '@chakra-ui/react';
import Header from './components/Common/Header';
import Layout from './components/Common/Layout';

const TestPage = () => {
  return (
    <Layout>
      <Header title={'testpage'} />
      <Box as="main" mt={4}>
        <CommonButton onClick={() => {}} value="버튼테스트" />
      </Box>
    </Layout>
  );
};

export default TestPage;
