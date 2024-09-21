import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Text, Image } from '@chakra-ui/react';
import Layout from '../../../components/Common/Layout';
import successImage from '../../../assets/images/Logo.png';
import { logout } from '../../../api/Auth/AuthService';

const WithdrawalSuccessPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Layout hasTapBar={true}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        p={4}
        bg="white"
        maxW="428px"
        mx="auto"
      >
        <Image src={successImage} alt="탈퇴 성공" boxSize="150px" mb={8} />
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          회원탈퇴가 완료되었습니다
        </Text>
        <Text fontSize="md" color="gray.500" mb={8} textAlign="center">
          그동안 깊은산골짜기를 이용해주셔서 감사합니다.
        </Text>
        <Button
          colorScheme="teal"
          borderRadius="full"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          처음으로
        </Button>
      </Flex>
    </Layout>
  );
};

export default WithdrawalSuccessPage;
