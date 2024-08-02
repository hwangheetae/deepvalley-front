import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import Layout from '../../../components/Common/Layout';
import CustomButton from '../../../components/Common/CustomButton';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import SocialKakao from '../SocialLogin/KaKao/SocialKakaoButton';
import Logo from '../../../assets/images/Logo.png';
import { login } from '../../../api/Auth/AuthService';
import { useMutation } from '@tanstack/react-query';
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
  잘못된요청,
  잘못된비밀번호,
  에러404,
  서버오류,
} from '../../../constant/constant';
import useHandleError from '../../../hooks/useErrorToast';
import useSuccessToast from '../../../hooks/useSuccessToast';

const Login: FC = () => {
  const navigate = useNavigate();
  const { errorToast } = useHandleError();
  const { successToast } = useSuccessToast();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.access_token);
      navigate('/');
      successToast({
        title: '로그인 성공!',
        description: '로그인에 성공하였습니다.',
      });
    },
    onError: (err: any) => {
      if (err.response.status === 400) {
        errorToast(잘못된요청);
      }
      if (err.response.status === 401) {
        errorToast(잘못된비밀번호);
      }
      if (err.response.status === 404) {
        errorToast(에러404);
      }
      if (err.response.status === 500) {
        errorToast(서버오류);
      }
    },
  });

  const handleSubmit = (values: { login_email: string; password: string }) => {
    mutation.mutate(values);
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
