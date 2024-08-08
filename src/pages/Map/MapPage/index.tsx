import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useState, useEffect, useRef } from 'react';
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
import { MyLocation, LocationOn } from '@mui/icons-material';
import ListComponent from '../ListComponent';
import { ValleysType } from '../../../types';
import { fetchValleys } from '../../../api/Valley';
import 산잉 from '../../../assets/images/산잉.png';

export const MapPage = () => {
  const location = Locations();
  const [positions, setPositions] = useState<ValleysType[]>([]);
  const [level, setLevel] = useState<number>(5); // 기본 레벨 값을 5로 설정
  const [selectedValley, setSelectedValley] = useState<ValleysType | null>(
    null,
  );
  const [categoryMarkers, setCategoryMarkers] = useState<any[]>([]);
  const theme = useTheme();
  const mapRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState('13%');
  const [currentCategory, setCurrentCategory] = useState<null>(null);

  const calculateRadius = (level: number) => {
    const baseRadius = 50; // 레벨 1일 때의 반경(m)
    const radius = baseRadius * Math.pow(2, level - 1);
    return radius;
  };

  const fetchAndSetValleys = async (
    lat: number,
    lng: number,
    radius: number,
  ) => {
    try {
      const data = await fetchValleys(lat, lng, radius);
      setPositions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBoundsChanged = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      const newLevel = map.getLevel();
      if (newLevel !== level) {
        setLevel(newLevel);
      }
    }
  };

  const handleReFetch = async () => {
    if (mapRef.current) {
      const map = mapRef.current;
      const center = map.getCenter();
      const level = map.getLevel();
      const radius = calculateRadius(level);
      await fetchAndSetValleys(center.getLat(), center.getLng(), radius);
      await fetchAndSetValleys(center.getLat(), center.getLng(), radius);
    }
  };

  const handleMarkerClick = (valley: ValleysType) => {
    setSelectedValley(valley);
    setIsOpen(true);
    setHeight('80%');
  };

  const removeCategoryMarkers = () => {
    setCategoryMarkers([]);
  };

  const handleCategorySearch = (category: any, src: string) => {
    if (mapRef.current) {
      const map = mapRef.current;
      console.log(map.getBounds);

      if (currentCategory === category) {
        removeCategoryMarkers();
        setCurrentCategory(null);
        return;
      }

      setCurrentCategory(category);

      const places = new kakao.maps.services.Places();
      const bounds = map.getBounds();
      const center = map.getCenter();

      const callback = (result: any[], status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const markers = result.map((place) => (
            <CustomMapMarker
              key={place.id}
              position={{ lat: place.y, lng: place.x }}
              src={src}
              label={place.place_name}
              showLabel={true}
            />
          ));

          setCategoryMarkers(markers);
        }
      };

      places.categorySearch(category, callback, {
        location: center,
        bounds: bounds,
      });
    }
  };

  const handleMoveToCurrentLocation = () => {
    if (mapRef.current && location) {
      const map = mapRef.current;
      const center = new kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      );
      map.setCenter(center);
      map.setLevel(5); // 레벨을 5로 설정
    }
  };

  useEffect(() => {
    if (location) {
      const radius = calculateRadius(level);
      fetchAndSetValleys(location.latitude, location.longitude, radius);
    }
  }, [location]);

  if (!location) {
    return <Center h="100vh">Loading...</Center>;
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
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: '100%', height: '100%' }}
          onBoundsChanged={handleBoundsChanged}
          level={level}
          ref={mapRef}
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
            </InputGroup>
            <HStack spacing={2} justify="center" w="100%">
              <Button
                size="sm"
                colorScheme="gray"
                onClick={() => handleCategorySearch('PK6', 'parking.png')}
              >
                주차장
              </Button>
              <Button
                size="sm"
                colorScheme="teal"
                onClick={() => handleCategorySearch('HP8', 'safety.png')}
              >
                병원
              </Button>
              <Button size="sm" colorScheme="blue" onClick={handleReFetch}>
                위치 재검색
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
                src={산잉}
                position={{ lat: valley.latitude, lng: valley.longitude }}
                label={valley.name}
                onClick={() => handleMarkerClick(valley)}
                showLabel={false} // 계곡 마커에는 라벨 표시하지 않음
              />
            ))}
          </MarkerClusterer>
          {categoryMarkers}

          <IconButton
            aria-label="현재 위치로 이동"
            icon={<MyLocation />}
            onClick={handleMoveToCurrentLocation}
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
        <ListComponent
          visibleValleys={positions}
          selectedValley={selectedValley}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setHeight={setHeight}
        />{' '}
      </Box>
      <Box position="absolute" bottom="0" left="0" width="100%" zIndex="25">
        <TapBar />
      </Box>
    </Flex>
  );
};

export default MapPage;
