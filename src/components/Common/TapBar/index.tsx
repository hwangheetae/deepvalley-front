import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import homeIcon from '../../../assets/icons/Category/home.png';
import homeIconActive from '../../../assets/icons/Category/homeActive.png';
import mapIcon from '../../../assets/icons/Category/map.png';
import mapIconActive from '../../../assets/icons/Category/mapActive.png';
import searchIcon from '../../../assets/icons/Category/search.png';
import searchIconActive from '../../../assets/icons/Category/searchActive.png';
import myPageIcon from '../../../assets/icons/Category/myPage.png';
import myPageIconActive from '../../../assets/icons/Category/myPageActive.png';

const TapBar: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box
      as="footer"
      maxW="430px"
      w="100%"
      bg="white"
      p={0}
      boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
      position="fixed"
      bottom="0"
      zIndex="2"
    >
      <Flex justify="space-around" align="center">
        <IconButton
          ml={2}
          as={Link}
          to="/"
          aria-label="Go To Home"
          icon={
            <Image
              src={currentPath === '/' ? homeIconActive : homeIcon}
              boxSize={8}
            />
          }
          variant="ghost"
          size="lg"
        />

        <IconButton
          as={Link}
          to="/mappage"
          aria-label="Go To Map"
          icon={
            <Image
              src={currentPath === '/mappage' ? mapIconActive : mapIcon}
              boxSize={8}
            />
          }
          variant="ghost"
          size="lg"
        />

        <IconButton
          as={Link}
          to="/search"
          aria-label="Search"
          icon={
            <Image
              src={currentPath === '/search' ? searchIconActive : searchIcon}
              boxSize={8}
            />
          }
          variant="ghost"
          size="lg"
        />

        <IconButton
          mr={2}
          as={Link}
          to="/myPage"
          aria-label="My Page"
          icon={
            <Image
              src={currentPath === '/myPage' ? myPageIconActive : myPageIcon}
              boxSize={8}
              borderRadius="full"
            />
          }
          variant="ghost"
          size="lg"
        />
      </Flex>
    </Box>
  );
};

export default TapBar;
