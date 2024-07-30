import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import Layout from '../../../components/Common/Layout';
import CustomButton from '../../../components/Common/CustomButton';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import SocialKakao from '../SocialLogin/KaKao/SocialKakaoButton';
import Logo from '../../../assets/images/Logo.png';
import { login } from '../../../api/Auth/AuthService';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
  Input,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import {
  INVALID_REUEST_BODY_SERVER_MESSAGE,
  INVALID_REUEST_BODY_MESSAGE,
  INVALID_REQUEST_EMAIL_OR_PASSWORD_SERVER_MESSAGE,
  INVALID_REQUEST_EMAIL_OR_PASSWORD,
  ERROR_MESSAGE_404,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from '../../../constant/constant';
import useHandleError from '../../../hooks/useErrorToast';
import useSuccessToast from '../../../hooks/useSuccessToast';

const Login: FC = () => {
  const navigate = useNavigate();
  const { errorToast } = useHandleError();
  const { successToast } = useSuccessToast();
  const handleSubmit = async (values: {
    login_email: string;
    password: string;
  }) => {
    try {
      const response = await login(values);
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);

        navigate('/');
        successToast('로그인 성공!', '로그인에 성공하였습니다.');
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        if (err.response.data === INVALID_REUEST_BODY_SERVER_MESSAGE) {
          errorToast(INVALID_REUEST_BODY_MESSAGE);
        }
        if (
          err.response.data === INVALID_REQUEST_EMAIL_OR_PASSWORD_SERVER_MESSAGE
        ) {
          errorToast(INVALID_REQUEST_EMAIL_OR_PASSWORD);
        }
      }
      if (err.response.status === 404) {
        errorToast(ERROR_MESSAGE_404);
      }
      if (err.response.status === 500) {
        errorToast(INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  };

  return (
    <Layout>
      <Flex
        direction="column"
        bg="white"
        align="center"
        justify="center"
        h="100vh"
        p={4}
      >
        <Image
          boxSize="150px"
          objectFit="contain"
          src={Logo}
          alt="Logo"
          mb={4}
        />
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb={8}
          fontFamily="Cafe24Ssurround"
        >
          깊은산골짜기
        </Text>

        <Formik
          initialValues={{
            login_email: '',
            password: '',
            // rememberMe: false,
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, touched }) => (
            <form
              onSubmit={handleSubmit}
              style={{ width: '70%', maxWidth: '400px' }}
            >
              <VStack spacing={4} w="full">
                <FormControl
                  isInvalid={!!errors.login_email && touched.login_email}
                >
                  <Field
                    as={Input}
                    id="login_email"
                    name="login_email"
                    type="email"
                    variant="outline"
                    placeholder="이메일"
                    borderRadius="full"
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = '이메일을 입력해주세요';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.login_email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password && touched.password}>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="outline"
                    placeholder="비밀번호"
                    borderRadius="full"
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = '비밀번호를 입력해주세요';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                  <Flex justify="flex-end" w="full">
                    <Link href="#" color="teal.500" fontSize="sm" p={2}>
                      비밀번호를 잊으셨나요?
                    </Link>
                  </Flex>
                </FormControl>

                <CustomButton
                  type="submit"
                  width="full"
                  borderRadius="full"
                  ButtonStyle={buttonStyle}
                >
                  로그인
                </CustomButton>

                <SocialKakao />

                <Flex w="full" justify="center">
                  <Text fontSize="sm">계정이 없으신가요?</Text>
                  <Link href="/register" color="teal.500" ml={1} fontSize="sm">
                    회원가입
                  </Link>
                </Flex>
              </VStack>
            </form>
          )}
        </Formik>
      </Flex>
    </Layout>
  );
};

export default Login;
