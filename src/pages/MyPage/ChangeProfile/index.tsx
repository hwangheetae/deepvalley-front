import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import CustomButton from '../../../components/Common/CustomButton';
import Layout from '../../../components/Common/Layout';
import { changeProfile } from '../../../api/User';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import { Header } from '../../../components/Common';
import { useMe } from '../../../stores/meStore';
import PasswordChangeLogo from '../../../assets/images/PasswordChangeLogo.png';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
  Input,
  Image,
  Text,
  useToast,
  Textarea,
  Box,
} from '@chakra-ui/react';
import {
  INVALID_REUEST_BODY_MESSAGE,
  ERROR_MESSAGE_404,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from '../../../constant/constant';

const ChangeProfile: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { me, updateMe } = useMe();
  const [imgFile, setImgFile] = useState<string>(me.profile_image_url);
  const upload = useRef<HTMLInputElement | null>(null);

  const imgUpload = () => {
    if (upload.current?.files) {
      const file = upload.current.files[0];
      setImgFile(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values: {
    name: string;
    profile_image_url: string;
    description: string;
  }) => {
    try {
      const response = await changeProfile(values);
      console.log(response);
      if (response.status === 200) {
        updateMe(values);
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
        setError(INVALID_REUEST_BODY_MESSAGE);
      }
      if (err.response.status === 404) {
        setError(ERROR_MESSAGE_404);
      }

      if (err.response.status === 500) {
        setError(INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  };
  useEffect(() => {
    if (error !== null) {
      toast({
        title: '에러!',
        description: error,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    }
  }, [error, toast]);
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
        position="relative"
      >
        <Box position="relative">
          <Image
            borderRadius="full"
            boxSize="150px"
            src={imgFile || PasswordChangeLogo}
            alt="profile-image"
          />
          <input
            type="file"
            ref={upload}
            onChange={imgUpload}
            accept="image/*"
            style={{
              display: 'none',
            }}
          />
          <Box
            position="absolute"
            bottom="5px"
            right="5px"
            cursor="pointer"
            onClick={() => upload.current?.click()}
          >
            <CameraAltIcon fontSize="large" />
          </Box>
        </Box>

        <Text
          fontSize="md"
          color={'gray.400'}
          fontWeight={'light'}
          fontFamily="Cafe24Ssurround"
          mt={4}
          mb={8}
        >
          {me.login_email}
        </Text>
        <Formik
          initialValues={{
            name: me.name,
            profile_image_url: me.profile_image_url || '',
            description: me.description || '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleSubmit, errors, touched }) => (
            <form
              onSubmit={handleSubmit}
              style={{ width: '70%', maxWidth: '400px' }}
            >
              <VStack spacing={8} w="full">
                <FormControl isInvalid={!!errors.name && touched.name}>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    variant="outline"
                    placeholder="이름"
                    borderRadius="full"
                    validate={(value: string) => {
                      let error;
                      if (!value) {
                        error = '이름을 입력해주세요';
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.description && touched.description}
                >
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    type="description"
                    variant="outline"
                    placeholder="소개글"
                    borderRadius="lg"
                    size="lg"
                    value={values.description || ''}
                  />
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
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

export default ChangeProfile;
