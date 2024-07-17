import { Map } from 'react-kakao-maps-sdk';
import { useState, useMemo } from 'react';
import CustomMapMarker from './CustomMapMarker';
import Locations from './Locations';
import {
  IconButton,
  Box,
  Flex,
  Center,
  Input,
  VStack,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
} from '@chakra-ui/react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SearchIcon } from '@chakra-ui/icons';
import { useTheme } from '@chakra-ui/react';
import TapBar from '../../components/Common/TapBar';
import { WbSunny } from '@mui/icons-material';
import ListComponent from './ListComponent';
import ValleyMockData, { Valley } from '../../api/ValleyApi/ValleyMockData';

export const MapPage = () => {
  const location = Locations();
  const [key, setKey] = useState(0);
  const theme = useTheme();

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const xxLocation = useMemo(() => {
    if (location) {
      const xlatitudeOffset = 0.008;
      const xlongitudeOffset = 0.008;
      return {
        latitude: location.latitude + xlatitudeOffset,
        longitude: location.longitude + xlongitudeOffset,
      };
    }
    return null;
  }, [location]);

  const yyLocation = useMemo(() => {
    if (location) {
      const ylatitudeOffset = 0.009;
      const ylongitudeOffset = 0.009;
      return {
        latitude: location.latitude + ylatitudeOffset,
        longitude: location.longitude + ylongitudeOffset,
      };
    }
    return null;
  }, [location]);

  if (!location) {
    return <Center h="100vh">Loading...</Center>;
  }

  const valleys: Valley[] = ValleyMockData.map((valley) => {
    if (valley.name === '구름계곡' && xxLocation) {
      return {
        ...valley,
        latitude: xxLocation.latitude,
        longitude: xxLocation.longitude,
      };
    }
    if (valley.name === '굿굿계곡' && yyLocation) {
      return {
        ...valley,
        latitude: yyLocation.latitude,
        longitude: yyLocation.longitude,
      };
    }
    return valley;
  });

  return (
    <Flex
      direction="column"
      h="100vh"
      maxW="430px"
      mx="auto"
      position="relative"
    >
      <Box flex="1" position="relative">
        <Map
          key={key}
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: '100%', height: '100%' }}
        >
          <VStack
            spacing={4}
            position="absolute"
            top="4"
            left="50%"
            transform="translateX(-50%)"
            zIndex="20"
            w="70%"
          >
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="black" />}
              />
              <Input
                placeholder="지역을 입력하세요"
                size="md"
                borderRadius="full"
                boxShadow="md"
                bg="white"
              />
              <IconButton
                aria-label="날씨 확인"
                icon={<WbSunny />}
                isRound={true}
                position="absolute"
                right="-12"
                bg="white"
                border="2px"
                borderColor="#306839"
                shadow="inner"
                zIndex="20"
              />
            </InputGroup>
            <HStack spacing={2} justify="center" w="100%">
              <Button size="sm" colorScheme="green">
                계곡
              </Button>
              <Button size="sm" colorScheme="gray">
                편의시설
              </Button>
              <Button size="sm" colorScheme="teal">
                안전시설
              </Button>
            </HStack>
          </VStack>
          <CustomMapMarker
            icon={
              <LocationOnIcon
                style={{
                  color: theme.colors.secondary[500],
                  fontSize: '34px',
                }}
              />
            }
            position={{ lat: location.latitude, lng: location.longitude }}
            label="현재위치"
          />
          {xxLocation && (
            <CustomMapMarker
              src="ValleyIcon.png"
              position={{ lat: xxLocation.latitude, lng: xxLocation.longitude }}
              label="굿굿계곡"
            />
          )}
          {yyLocation && (
            <CustomMapMarker
              src="ValleyIcon.png"
              position={{ lat: yyLocation.latitude, lng: yyLocation.longitude }}
              label="구름계곡"
            />
          )}
          <IconButton
            aria-label="현재 위치로 이동"
            icon={<MyLocationIcon />}
            onClick={handleRefresh}
            isRound={true}
            position="absolute"
            bottom="36"
            right="4"
            bg="white"
            border="2px"
            borderColor="#306839"
            shadow="inner"
            zIndex="20"
          />
        </Map>
        <ListComponent valleys={valleys} />
      </Box>
      <Box position="absolute" bottom="0" left="0" width="100%" zIndex="25">
        <TapBar />
      </Box>
    </Flex>
  );
};

export default MapPage;
