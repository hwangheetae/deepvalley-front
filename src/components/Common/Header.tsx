import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';

interface HeaderProps {
  title: string;
  showMenuButton?: boolean;
  showBorderBottom?: boolean;
}

const Header: FC<HeaderProps> = ({
  title,
  showMenuButton = false,
  showBorderBottom = false,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box
      as="header"
      maxW="430px"
      w="full"
      bg="white"
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
        />
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        {showMenuButton ? (
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
          />
        ) : (
          <Box w="40px" />
        )}
      </Flex>
    </Box>
  );
};

export default Header;
