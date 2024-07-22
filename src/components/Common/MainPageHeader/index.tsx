import React, { FC } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo2 from '../../../assets/images/Logo2.png';
import { MainPageHeaderProps } from '../../../types/ComponentType';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  Text,
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';

const MainPageHeader: FC<MainPageHeaderProps> = ({
  title,
  showMenuButton = false,
  showBorderBottom = false,
  fontFamily,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  return (
    <Box
      as="header"
      maxW="428px"
      w="full"
      bg="white"
      p={2}
      borderBottom={showBorderBottom ? '1px solid #e0e0e0' : 'none'}
      position="fixed"
      top="0"
      zIndex="2"
    >
      <Flex justify="space-between" align="center" height="50px">
        <Flex align="center" height="full">
          <Image src={Logo2} alt="Logo2" height="50%" mr={4} />
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontFamily={fontFamily}
            lineHeight="50px"
          >
            {title}
          </Text>
        </Flex>
        {showMenuButton ? (
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onOpen}
            ref={btnRef} // 추가된 부분
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
              <Button variant="ghost">프로필 수정하기</Button>
              <Button variant="ghost">비밀번호 변경하기</Button>
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

export default MainPageHeader;
