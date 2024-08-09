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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Layout } from '../../../components/Common';
import { CustomButton } from '../../../components/Common';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import Logo from '../../../assets/images/Logo.png';
import useFindPasswordMutation from '../../../queries/useFindPasswordMutation.ts';

const PasswordFind = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [responseData, setResponseData] = useState<any>(null);

  const handleSuccess = (data: any) => {
    setResponseData(data);
    onOpen();
  };

  const mutation = useFindPasswordMutation(handleSuccess);
  const handleSubmit = (values: { login_email: string }) => {
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
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, touched, errors }) => (
            <form
              onSubmit={handleSubmit}
              style={{ width: '70%', maxWidth: '400px' }}
            >
              <VStack spacing={4} w="full" align={'center'} justify="center">
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
                <CustomButton
                  type="submit"
                  width="full"
                  borderRadius="full"
                  ButtonStyle={buttonStyle}
                >
                  비밀번호 찾기
                </CustomButton>
                <Flex justify="center" align={'center'} w="full" p={4}>
                  <Link href="/login" color="teal.500" fontSize="xs" p={1}>
                    로그인하기
                  </Link>
                  <Text color={'gray.400'}>|</Text>
                  <Link href="/id_find" color="teal.500" fontSize="xs" p={1}>
                    이메일 찾기
                  </Link>
                </Flex>
              </VStack>
            </form>
          )}
        </Formik>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'xs'}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'} color={'teal.500'}>
            비밀번호 찾기
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={'center'}>
            {responseData ? (
              <Text fontSize={'sm'} p={2}>
                회원님의 임시 비밀번호는 <br />
                <b>{responseData.password}</b> 입니다.
              </Text>
            ) : (
              ''
            )}
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default PasswordFind;
