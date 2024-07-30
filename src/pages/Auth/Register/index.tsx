import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import CustomButton from '../../../components/Common/CustomButton';
import Layout from '../../../components/Common/Layout';
import Logo from '../../../assets/images/Logo.png';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import { emailRegEx, passwordRegEx } from '../../../utils/Regex';
import { register } from '../../../api/Auth/AuthService';
import useErrorToast from '../../../hooks/useErrorToast';
import useSuccessToast from '../../../hooks/useSuccessToast';

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
  이미존재하는이메일입니다,
  이메일이중복되었어요,
  닉네임이중복되었어요,
  이미존재하는닉네임입니다,
  서버오류,
} from '../../../constant/constant';

const Register: FC = () => {
  const navigate = useNavigate();
  const { errorToast } = useErrorToast();
  const { successToast } = useSuccessToast();
  //db 명칭상 이유로 nickname => name
  const handleSubmit = async (values: {
    login_email: string;
    name: string;
    password: string;
  }) => {
    try {
      const response = await register(values);
      if (response.status === 201) {
        successToast('회원가입 성공!', '로그인 하고 서비스를 계속 사용하세요.');
        navigate('/login');
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        errorToast(잘못된요청);
      }
      if (err.response.status === 409) {
        if (err.response.data === 이메일이중복되었어요) {
          errorToast(이미존재하는이메일입니다);
        }
        if (err.response.data === 닉네임이중복되었어요) {
          errorToast(이미존재하는닉네임입니다);
        }
      }
      if (err.response.status === 500) {
        errorToast(서버오류);
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
            name: '',
            password: '',
            checkPassword: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleSubmit, errors, touched }) => (
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
                      let error = '';
                      if (!value) {
                        error = '이메일을 입력해주세요';
                      } else if (value.match(emailRegEx) === null) {
                        error = '올바른 이메일 형식을 지켜주세요';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.login_email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.name && touched.name}>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="name"
                    variant="outline"
                    placeholder="닉네임"
                    borderRadius="full"
                    validate={(value: string) => {
                      let error = '';
                      if (!value) {
                        error = '닉네임을 입력해주세요';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
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
                      let error = '';
                      if (!value) {
                        error = '비밀번호를 입력해주세요';
                      } else if (value.match(passwordRegEx) === null) {
                        error =
                          '8~20자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.checkPassword && touched.checkPassword}
                >
                  <Field
                    as={Input}
                    id="checkPassword"
                    name="checkPassword"
                    type="password"
                    variant="outline"
                    placeholder="비밀번호 확인"
                    borderRadius="full"
                    validate={(value: string) => {
                      let error = '';
                      error;
                      if (!value) {
                        error = '비밀번호를 다시 입력해주세요';
                      } else if (value !== values.password)
                        return (error = '비밀번호가 같은지 확인하세요');
                    }}
                  />
                  <FormErrorMessage>{errors.checkPassword}</FormErrorMessage>
                </FormControl>
                <CustomButton
                  type="submit"
                  width="full"
                  borderRadius="full"
                  ButtonStyle={buttonStyle}
                >
                  회원가입
                </CustomButton>

                <Flex w="full" justify="center">
                  <Text fontSize="sm">이미 계정이 있으신가요?</Text>
                  <Link href="/login" color="teal.500" ml={1} fontSize="sm">
                    로그인
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

export default Register;
