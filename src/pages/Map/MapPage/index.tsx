import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import CustomMapMarker from '../CustomMapMarker';
import Locations from '../Locations';
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
import { SearchIcon } from '@chakra-ui/icons';
import { useTheme } from '@chakra-ui/react';
import TapBar from '../../../components/Common/TapBar';
import { WbSunny, MyLocation, LocationOn } from '@mui/icons-material';
import ListComponent from '../ListComponent';
import { ValleysType, FacilityType } from '../../../types';
import { fetchValleys, fetchfacilities } from '../../../api/Valley';
import { useQuery } from '@tanstack/react-query';

interface MapBounds {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

export const MapPage = () => {
  const location = Locations();
  const [key, setKey] = useState(0);
  const theme = useTheme();
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const [visibleValleys, setVisibleValleys] = useState<ValleysType[]>([]);
  const [positions, setPositions] = useState<ValleysType[]>([]);

  const {
    data: valleys = [],
    isLoading: isLoadingValleys,
    error: errorValleys,
    refetch: refetchValleys,
  } = useQuery<ValleysType[], Error>({
    queryKey: ['valleys'],
    queryFn: fetchValleys,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const {
    data: facilities = [],
    isLoading: isLoadingFacilities,
    error: errorFacilities,
    refetch: refetchFacilities,
  } = useQuery<FacilityType[], Error>({
    queryKey: ['facilities', location?.latitude, location?.longitude],
    queryFn: () => fetchfacilities(location!.latitude, location!.longitude),
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (bounds && valleys.length > 0) {
      const visible = valleys.filter(
        (valley) =>
          valley.latitude >= bounds.swLat &&
          valley.latitude <= bounds.neLat &&
          valley.longitude >= bounds.swLng &&
          valley.longitude <= bounds.neLng,
      );
      setVisibleValleys(visible);
    }
  }, [bounds, valleys]);

  useEffect(() => {
    setPositions(valleys);
  }, [valleys]);

  const handleBoundsChanged = (map: any) => {
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    setBounds({
      swLat: sw.getLat(),
      swLng: sw.getLng(),
      neLat: ne.getLat(),
      neLng: ne.getLng(),
    });
  };

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
    refetchValleys();
    refetchFacilities();
  };

  if (!location || isLoadingValleys || isLoadingFacilities) {
    return <Center h="100vh">Loading...</Center>;
  }

  if (errorValleys || errorFacilities) {
    return <Center h="100vh">Error loading data</Center>;
  }

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
          onBoundsChanged={handleBoundsChanged}
          level={5}
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
              <LocationOn
                style={{
                  color: theme.colors.secondary[500],
                  fontSize: '34px',
                }}
              />
            }
            position={{ lat: location.latitude, lng: location.longitude }}
            label="현재위치"
          />
          <MarkerClusterer averageCenter={true} minLevel={10}>
            {positions.map((valley) => (
              <CustomMapMarker
                key={valley.valley_id}
                src={valley.thumbnail}
                position={{ lat: valley.latitude, lng: valley.longitude }}
                label={valley.name}
              />
            ))}
          </MarkerClusterer>
          {/* {facilities.map((facility) => (
            <CustomMapMarker
              key={facility.facility_id}
              src={facility.thumbnail}
              position={{ lat: facility.latitude, lng: facility.longitude }}
              label={facility.name}
            />
          ))}시설들 데이터 아직 X */}
          <IconButton
            aria-label="현재 위치로 이동"
            icon={<MyLocation />}
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
        <ListComponent visibleValleys={visibleValleys} />
      </Box>
      <Box position="absolute" bottom="0" left="0" width="100%" zIndex="25">
        <TapBar />
      </Box>
    </Flex>
  );
};

export default MapPage;
