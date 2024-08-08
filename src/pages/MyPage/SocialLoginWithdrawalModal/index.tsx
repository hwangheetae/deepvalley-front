import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

import useSocialLoginWithdrawalMutation from '../../../queries/useSocialLoginWithdrawalMutation';
interface SocialLoginWithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  finalRef: React.RefObject<HTMLInputElement>;
}

const SocialLoginWithdrawalModal: FC<SocialLoginWithdrawalModalProps> = ({
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const mutation = useSocialLoginWithdrawalMutation();
  const handleClick = async () => {
    mutation.mutate();
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
        </ModalBody>
        <ModalFooter>
          <Button type="button" colorScheme="red" mr={3} onClick={handleClick}>
            탈퇴하기
          </Button>
          <Button onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SocialLoginWithdrawalModal;
