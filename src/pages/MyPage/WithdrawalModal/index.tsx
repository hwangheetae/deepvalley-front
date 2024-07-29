import { FC } from 'react';
import { Formik, Field } from 'formik';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useMe } from '../../../stores/meStore';
import { membershipWithdrawal } from '../../../api/User';
import { useNavigate } from 'react-router-dom';
import {
  INVALID_REUEST_BODY_MESSAGE,
  ERROR_MESSAGE_404,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from '../../../constant/constant';
import useHandleError from '../../../hooks/useHandleError';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  finalRef: React.RefObject<HTMLInputElement>;
}

const WithdrawalModal: FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const { me } = useMe();
  const toast = useToast();
  const navigate = useNavigate();
  const { handleError } = useHandleError();
  const handleSubmit = async (values: {
    login_email: string;
    password: string;
  }) => {
    try {
      console.log(values);
      const response = await membershipWithdrawal(values);
      if (response.status === 200) {
        toast({
          title: '회원탈퇴 성공!',
          description: `회원탈퇴가 완료되었습니다.`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
        onClose();
        navigate('/WithdrawalSuccessPage');
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        handleError(INVALID_REUEST_BODY_MESSAGE);
      }
      if (err.response.status === 404) {
        handleError(ERROR_MESSAGE_404);
      }

      if (err.response.status === 500) {
        handleError(INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={'xs'}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <Formik
        initialValues={{
          login_email: me.login_email,
          password: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
          <form
            onSubmit={handleSubmit}
            style={{ width: '70%', maxWidth: '400px' }}
          >
            <ModalContent>
              <ModalHeader textAlign="center">회원탈퇴</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text textAlign="center" fontWeight="bold">
                  정말 깊은산골짜기를 탈퇴하실건가요?
                </Text>
                <br />
                <Text textAlign="center">
                  탈퇴하시면 모든 활동정보가 <br />
                  삭제되요😢
                </Text>
                <FormControl
                  mt={4}
                  isInvalid={!!errors.password && touched.password}
                >
                  <FormLabel>비밀번호</FormLabel>
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
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="red" mr={3}>
                  탈퇴하기
                </Button>
                <Button onClick={onClose}>취소</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default WithdrawalModal;
