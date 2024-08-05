import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';

const TapBar: FC = () => {
  return (
    <Box
      as="footer"
      maxW="430px"
      w="100%"
      bg="white"
      p={4}
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.2)"
      position="fixed"
      bottom="0"
      zIndex="2"
    >
      <Flex justify="space-between" align="center">
        <IconButton
          as={Link}
          to="/"
          aria-label="Go To Home"
          icon={<HomeOutlinedIcon fontSize="large" />}
          variant="ghost"
        />

        <IconButton
          as={Link}
          to="/mappage"
          aria-label="Go To Map"
          icon={<MapOutlinedIcon fontSize="large" />}
          variant="ghost"
        />

        <IconButton
          as={Link}
          to="/search"
          aria-label="Search"
          icon={<EditNoteOutlinedIcon fontSize="large" />}
          variant="ghost"
        />

        <IconButton
          as={Link}
          to="/myPage"
          aria-label="My Page"
          icon={<LandscapeOutlinedIcon fontSize="large" />}
          variant="ghost"
        />
      </Flex>
    </Box>
  );
};

export default TapBar;
