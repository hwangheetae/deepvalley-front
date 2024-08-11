import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { DrawerComponentProps } from '../../../types/ComponentType';

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent
        sx={{
          maxWidth: '50vw',
        }}
      >
        <DrawerHeader>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onClose}
          />
        </DrawerHeader>
        <DrawerBody>
          <Flex direction="column" bg="white" align="start">
            <Button
              variant="ghost"
              onClick={() => navigate('../ChangeProfile')}
            >
              프로필 수정하기
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('../ChangePassword')}
            >
              비밀번호 변경하기
            </Button>
          </Flex>
        </DrawerBody>
        <DrawerFooter justifyContent="flex-start">
          <Button
            variant="ghost"
            mr={3}
            onClick={() => {
              navigate('/logout');
            }}
          >
            로그아웃
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
