import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import CustomButton from '../../../components/Common/CustomButton';
import Layout from '../../../components/Common/Layout';
import PasswordChangeLogo from '../../../assets/images/PasswordChangeLogo.png';
import { changePassword } from '../../../api/User';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
  Input,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import {
  INVALID_REUEST_BODY_MESSAGE,
  ERROR_MESSAGE_404,
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_CURRENT_PASSWORD,
  SAME_OLD_AND_NEW_PASSWORD,
} from '../../../constant/constant';
import { passwordRegEx } from '../../../utils/Regex';
import { Header } from '../../../components/Common';
import useHandleError from '../../../hooks/useHandleError';

const ChangePassword: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { handleError } = useHandleError();
  const handleSubmit = async (values: {
    old_password: string;
    new_password: string;
  }) => {
    try {
      const response = await changePassword(values);
      console.log(response);
      if (response.status === 200) {
        toast({
          title: '비밀번호 변경 성공!',
          description: `비밀번호를 변경하였습니다.`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
        navigate('/');
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 400) {
        handleError(INVALID_REUEST_BODY_MESSAGE);
      }
      if (err.response.status === 401) {
        handleError(INVALID_CURRENT_PASSWORD);
      }
      if (err.response.status === 404) {
        handleError(ERROR_MESSAGE_404);
      }
      if (err.response.status === 422) {
        handleError(SAME_OLD_AND_NEW_PASSWORD);
      }
      if (err.response.status === 500) {
        handleError(INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  };

  return (
    <Layout>
      <Header />
      <Flex
        direction="column"
        bg="white"
        align="center"
        justify="center"
        h="100vh"
        p={4}
        maxW="428px"
        mx="auto"
      >
        <Flex bg="white" align="center" justify="center" p={4}>
          <Image
            boxSize="100px"
            objectFit="contain"
            src={PasswordChangeLogo}
            alt="PasswordChangeLogo"
            mb={4}
          />
          <Text fontSize="2xl" fontWeight="bold" fontFamily="Cafe24Ssurround">
            깊은산골짜기
          </Text>
        </Flex>

        <Formik
          initialValues={{
            old_password: '',
            new_password: '',
            newPasswordCheck: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleSubmit, errors, touched }) => (
            <form
              onSubmit={handleSubmit}
              style={{ width: '70%', maxWidth: '400px' }}
            >
              <VStack spacing={8} w="full">
                <FormControl
                  isInvalid={!!errors.old_password && touched.old_password}
                >
                  <Field
                    as={Input}
                    id="old_password"
                    name="old_password"
                    type="password"
                    variant="outline"
                    placeholder="현재 비밀번호"
                    borderRadius="full"
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = '현재 비밀번호를 입력해주세요';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.old_password}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.new_password && touched.new_password}
                >
                  <Field
                    as={Input}
                    id="new_password"
                    name="new_password"
                    type="password"
                    variant="outline"
                    placeholder="새 비밀번호"
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
                  <FormErrorMessage>{errors.new_password}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.newPasswordCheck && touched.newPasswordCheck
                  }
                >
                  <Field
                    as={Input}
                    id="newPasswordCheck"
                    name="newPasswordCheck"
                    type="password"
                    variant="outline"
                    placeholder="새 비밀번호 확인"
                    borderRadius="full"
                    validate={(value: string) => {
                      let error = '';
                      error;

                      if (value !== values.new_password) {
                        return (error = '비밀번호가 같은지 확인하세요');
                      }
                    }}
                  />
                  <FormErrorMessage>{errors.newPasswordCheck}</FormErrorMessage>
                </FormControl>
                <CustomButton
                  type="submit"
                  width="full"
                  borderRadius="full"
                  ButtonStyle={buttonStyle}
                >
                  저장
                </CustomButton>
              </VStack>
            </form>
          )}
        </Formik>
      </Flex>
    </Layout>
  );
};

export default ChangePassword;
