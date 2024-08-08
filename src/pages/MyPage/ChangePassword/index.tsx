import { FC } from 'react';
import { Formik, Field } from 'formik';
import CustomButton from '../../../components/Common/CustomButton';
import Layout from '../../../components/Common/Layout';
import 산잉 from '../../../assets/images/산잉.png';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
  Input,
  Image,
  Text,
} from '@chakra-ui/react';

import { passwordRegEx } from '../../../utils/Regex';
import { Header } from '../../../components/Common';
import useChangePasswordMutation from '../../../queries/useChangePasswordMutation';

const ChangePassword: FC = () => {
  const mutation = useChangePasswordMutation();
  const handleSubmit = async (values: {
    old_password: string;
    new_password: string;
  }) => {
    mutation.mutate(values);
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
            src={산잉}
            alt="산잉"
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
