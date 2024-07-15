import { useState } from 'react';
import { redirect } from 'react-router-dom';

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
const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const handleSubmit = async (values: {
    email: string;
    nickname: string;
    password: string;
  }) => {
    try {
      const userData = await register(
        values.email,
        values.nickname,
        values.password,
      );
      if (userData.status === 201) {
        toast({
          title: '회원가입 성공!',
          description: '로그인 하고 서비스를 계속 사용하세요.',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
        redirect('/login');
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        setError('잘못된 이메일 또는 비밀번호 입니다.');
      } else if (err.response.status === 409) {
        if (err.response.error === 'Email already exists') {
          setError('이미 존재하는 이메일입니다.');
        }
        if (err.response.error === 'nickname already exists') {
          setError('이미 존재하는 닉네임입니다.');
        }
      } else if (err.response.status === 500) {
        setError('서버에서 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
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
            email: '',
            nickname: '',
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
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="outline"
                    placeholder="이메일"
                    borderRadius="full"
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = '이메일을 입력해주세요';
                      } else if (value.match(emailRegEx) === null) {
                        error = '올바른 이메일 형식을 지켜주세요';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.nickname && touched.nickname}>
                  <Field
                    as={Input}
                    id="nickname"
                    name="nickname"
                    type="nickname"
                    variant="outline"
                    placeholder="닉네임"
                    borderRadius="full"
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = '닉네임을 입력해주세요';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.nickname}</FormErrorMessage>
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
                      let error;
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