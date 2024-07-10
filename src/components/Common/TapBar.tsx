import { Box, Flex, IconButton, Icon } from '@chakra-ui/react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
const TapBar = () => {
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
          aria-label="Go To Home"
          icon={<HomeOutlinedIcon fontSize="large" />}
          variant="ghost"
        />

        <IconButton
          aria-label="Go To Map"
          icon={<MapOutlinedIcon fontSize="large" />}
          variant="ghost"
        />

        <IconButton
          aria-label="Open menu"
          icon={<EditNoteOutlinedIcon fontSize="large" />}
          variant="ghost"
        />
        <IconButton
          aria-label="Open menu"
          icon={<LandscapeOutlinedIcon fontSize="large" />}
          variant="ghost"
        />
      </Flex>
    </Box>
  );
};

export default TapBar;
