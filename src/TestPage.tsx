import CustomButton from './components/Common/CustomButton';
import { Box } from '@chakra-ui/react';
import Layout from './components/Common/Layout';
import Input from './components/Common/CustomInput';

const TestPage = () => {
  return (
    <Layout>
      <Box as="main" mt={4}>
        <Input size="lg" />
      </Box>{' '}
      <Box as="main" mt={4}>
        <Input size="lg" />
      </Box>{' '}
      <Box as="main" mt={4}>
        <Input size="lg" />
      </Box>{' '}
      <Box as="main" mt={4}>
        <Input size="lg" />
      </Box>{' '}
      <Box as="main" mt={4}>
        <Input size="lg" />
      </Box>{' '}
      <Box as="main" mt={4}>
        <CustomButton onClick={() => {}} size="lg" value="버튼테스트" />
      </Box>{' '}
    </Layout>
  );
};

export default TestPage;
