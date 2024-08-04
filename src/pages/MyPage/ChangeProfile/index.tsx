import { FC, useState, useRef } from 'react';
import { Formik, Field } from 'formik';
import CustomButton from '../../../components/Common/CustomButton';
import Layout from '../../../components/Common/Layout';
import { buttonStyle } from '../../../styles/customChakraPropsStyle';
import { Header } from '../../../components/Common';
import { useMe } from '../../../stores/meStore';
import 산잉 from '../../../assets/images/산잉.png';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
  Input,
  Image,
  Text,
  Textarea,
  Box,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import WithdrawalModal from '../WithdrawalModal';
import useChangeProfileMutation from '../../../queries/useChangeProfileMutation';

const ChangeProfile: FC = () => {
  const { me } = useMe();
  const [imgFile, setImgFile] = useState<string>(me.profile_image_url);
  const upload = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const mutation = useChangeProfileMutation(imgFile);

  const imgUpload = () => {
    if (upload.current?.files) {
      const file = upload.current.files[0];
      setImgFile(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleSubmit = async (values: {
    name: string;
    description: string;
  }) => {
    const formData = new FormData();
    formData.append(
      'profileRequest',
      new Blob(
        [
          JSON.stringify({
            name: values.name,
            description: values.description,
          }),
        ],
        {
          type: 'application/json',
        },
      ),
    );

    if (file) {
      formData.append('profileImage', file);
    }
    mutation.mutate(formData);
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
        position="relative"
      >
        <Box position="relative">
          <Image
            borderRadius="full"
            boxSize="150px"
            src={imgFile || 산잉}
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
        <Button
          variant="link"
          colorScheme="gray"
          fontWeight="light"
          size="xs"
          onClick={onOpen}
          position="absolute"
          bottom="100px"
        >
          회원탈퇴
        </Button>
        <WithdrawalModal
          isOpen={isOpen}
          onClose={onClose}
          initialRef={initialRef}
          finalRef={finalRef}
        />
      </Flex>
    </Layout>
  );
};

export default ChangeProfile;
