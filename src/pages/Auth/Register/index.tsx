import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import CustomButton from '../../../components/Common/CustomButton';
import Layout from '../../../components/Common/Layout';
import Logo from '../../../assets/images/Logo.png';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
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
import { emailRegEx, passwordRegEx } from '../../../utils/Regex';
import { useToast } from '@chakra-ui/react';
import { register } from '../../../api/Auth/AuthService';
import {
  INVALID_REQUEST_EMAIL_OR_PASSWORD,
  ERROR_MESSAGE_404,
  INTERNAL_SERVER_ERROR_MESSAGE,
  EMAIL_CONFLICT_SERVER_MESSAGE,
  EMAIL_CONFLICT_MESSAGE,
  NICKNAME_CONFLICT_SERVER_MESSAGE,
  NICKNAME_CONFLICT_MESSAGE,
} from '../../../constant/constant';

const Register: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  //db 명칭상 이유로 nickname => name
  const handleSubmit = async (values: {
    login_email: string;
    name: string;
    password: string;
  }) => {
    try {
      const userData = await register(values);
      if (userData) {
        toast({
          title: '회원가입 성공!',
          description: '로그인 하고 서비스를 계속 사용하세요.',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
        navigate('/login');
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        setError(INVALID_REQUEST_EMAIL_OR_PASSWORD);
      }
      if (err.response.status === 404 || err.response.status === 403) {
        setError(ERROR_MESSAGE_404);
      }

      if (err.response.status === 409) {
        if (err.response.data === EMAIL_CONFLICT_SERVER_MESSAGE) {
          setError(EMAIL_CONFLICT_MESSAGE);
        }
        if (err.response.data === NICKNAME_CONFLICT_SERVER_MESSAGE) {
          setError(NICKNAME_CONFLICT_MESSAGE);
        }
      }

      if (err.response.status === 500) {
        setError(INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  };
  useEffect(() => {
    if (error !== null)
      toast({
        title: '에러!',
        description: `${error}`,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
  }, [error]);

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

                <CustomButton
                  type="button"
                  width="full"
                  borderRadius="full"
                  ButtonStyle={{
                    ...buttonStyle,
                    backgroundColor: '#fee500',
                    color: 'black',
                  }}
                >
                  <Flex align="center">
                    <Image
                      src="/path/to/kakao_icon.png"
                      alt="KakaoTalk Icon"
                      boxSize="20px"
                      mr={2}
                    />
                    카카오로 로그인
                  </Flex>
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
