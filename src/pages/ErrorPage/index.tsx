import { CustomButton, Layout } from '../../components/Common';
import { Box, Heading, Text, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../../styles/customChakraPropsStyle';
import 산잉_슬픈 from '../../assets/images/산잉_슬픈.png';
const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Layout hasTapBar={true}>
      <Flex direction="column" align="center" justify="center" height="100vh">
        <Image src={산잉_슬픈} alt="슬픈 이미지" boxSize="100px" />
        <Box textAlign="center" py={6} px={2}>
          <Heading
            display="inline-block"
            as="h1"
            size="4xl"
            bgGradient="linear(to-r, #39643B 0%, #59B86E 100%)"
            backgroundClip="text"
          >
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            페이지를 찾을 수 없습니다
          </Text>
          <Text color={'gray.500'} mb={6}>
            요청하신 페이지는 존재하지 않거나 이동되었습니다.
          </Text>
          <CustomButton
            color="white"
            variant="solid"
            onClick={handleGoHome}
            ButtonStyle={buttonStyle}
          >
            홈으로 돌아가기
          </CustomButton>
        </Box>
      </Flex>
    </Layout>
  );
};

export default ErrorPage;
