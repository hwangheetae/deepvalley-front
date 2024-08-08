import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { HeaderProps } from '../../../types/ComponentType';
import {
  Box,
  Flex,
  IconButton,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
const Header: FC<HeaderProps> = ({
  title,
  showMenuButton = false,
  showBorderBottom = false,
  bg = 'white',
  MenuColor = 'black',
}) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <Box
      as="header"
      maxW="428px"
      w="full"
      bg={bg}
      p={4}
      borderBottom={showBorderBottom ? '1px solid #e0e0e0' : 'none'}
      position="fixed"
      top="0"
      zIndex="2"
    >
      <Flex justify="space-between" align="center">
        <IconButton
          aria-label="Go back"
          icon={<ChevronLeftIcon />}
          onClick={handleBackClick}
          variant="ghost"
          color={MenuColor}
        />
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        {showMenuButton ? (
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onOpen}
          />
        ) : (
          <Box w="40px" />
        )}
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
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
    </Box>
  );
};

export default Header;
