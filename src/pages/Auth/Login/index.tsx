import { FC } from 'react';
import { Formik, Field } from 'formik';
import Layout from '../../../components/Common/Layout';
import CustomButton from '../../../components/Common/CustomButton';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import SocialKakao from '../SocialLogin/KaKao/SocialKakaoButton';
import Logo from '../../../assets/images/Logo.png';
import useLoginMutation from '../../../queries/useLoginMutation';
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

const Login: FC = () => {
  const mutation = useLoginMutation();

  const handleSubmit = (values: { login_email: string; password: string }) => {
    mutation.mutate(values);
  };

  return (
    <Layout hasTapBar={true}>
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
                    boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
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
                    boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = '비밀번호를 입력해주세요';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
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
                <Flex justify="center" align={'center'} w="full" p={4}>
                  <Link href="/id_find" color="teal.500" fontSize="xs" p={1}>
                    이메일 찾기
                  </Link>
                  <Text color={'gray.400'}>|</Text>
                  <Link
                    href="/password_find"
                    color="teal.500"
                    fontSize="xs"
                    p={1}
                  >
                    비밀번호 찾기
                  </Link>
                  <Text color={'gray.400'}>|</Text>
                  <Link href="/register" color="teal.500" fontSize="xs" p={1}>
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
