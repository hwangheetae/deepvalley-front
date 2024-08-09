import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { HeaderProps } from '../../../types/ComponentType';
import { Box, Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import DrawerComponent from '../DrawerComponent';
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
      <DrawerComponent isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
