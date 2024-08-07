import { Formik, Field } from 'formik';
import {
  FormControl,
  Flex,
  VStack,
  Input,
  Text,
  Link,
  FormErrorMessage,
  Image,
} from '@chakra-ui/react';
import { Layout } from '../../../components/Common';
import { CustomButton } from '../../../components/Common';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import Logo from '../../../assets/images/Logo.png';
import useFindIdMutation from '../../../queries/useFindIdMutation.ts';

const IDFind = () => {
  const mutation = useFindIdMutation();
  const handleSubmit = (values: { name: string }) => {
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
            name: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, touched, errors }) => (
            <form
              onSubmit={handleSubmit}
              style={{ width: '70%', maxWidth: '400px' }}
            >
              <VStack spacing={4} w="full" align={'center'} justify="center">
                <FormControl isInvalid={!!errors.name && touched.name}>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
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
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <CustomButton
                  type="submit"
                  width="full"
                  borderRadius="full"
                  ButtonStyle={buttonStyle}
                >
                  아이디 찾기
                </CustomButton>
                <Flex justify="center" align={'center'} w="full" p={4}>
                  <Link href="/login" color="teal.500" fontSize="xs" p={1}>
                    로그인하기
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
                </Flex>
              </VStack>
            </form>
          )}
        </Formik>
      </Flex>
    </Layout>
  );
};

export default IDFind;
