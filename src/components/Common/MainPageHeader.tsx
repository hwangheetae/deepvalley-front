import { Box, Flex, IconButton, Text, Image } from '@chakra-ui/react';
import { FC } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo2 from '../../assets/images/Logo2.png'; // 로고 이미지 경로를 설정하세요

interface MainPageHeaderProps {
  title: string;
  showMenuButton?: boolean;
  showBorderBottom?: boolean;
  fontFamily?: string;
}

const MainPageHeader: FC<MainPageHeaderProps> = ({
  title,
  showMenuButton = false,
  showBorderBottom = false,
  fontFamily,
}) => {
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
          />
        ) : (
          <Box w="40px" />
        )}
      </Flex>
    </Box>
  );
};

export default MainPageHeader;
