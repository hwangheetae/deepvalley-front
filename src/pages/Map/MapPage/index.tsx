import { Map } from 'react-kakao-maps-sdk';
import { useState } from 'react';
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
import { ValleysType } from '../../../types';
import { fetchValleys } from '../../../api/ValleyApi';
import { useQuery } from '@tanstack/react-query';

export const MapPage = () => {
  const location = Locations();
  const [key, setKey] = useState(0);
  const theme = useTheme();

  const {
    data: valleys = [],
    isLoading,
    error,
    refetch,
  } = useQuery<ValleysType[], Error>({
    queryKey: ['valleys'],
    queryFn: fetchValleys, // 쿼리 실행 조건
    staleTime: 1000 * 60 * 5, // fresh data time
    retry: false, // 에러 발생 시 자동 재시도 비활성화
  });

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
    refetch();
  };

  // const xxLocation = useMemo(() => {
  //   if (location) {
  //     const xlatitudeOffset = 0.008;
  //     const xlongitudeOffset = 0.008;
  //     return {
  //       latitude: location.latitude + xlatitudeOffset,
  //       longitude: location.longitude + xlongitudeOffset,
  //     };
  //   }
  //   return null;
  // }, [location]);

  // const yyLocation = useMemo(() => {
  //   if (location) {
  //     const ylatitudeOffset = 0.009;
  //     const ylongitudeOffset = 0.009;
  //     return {
  //       latitude: location.latitude + ylatitudeOffset,
  //       longitude: location.longitude + ylongitudeOffset,
  //     };
  //   }
  //   return null;
  // }, [location]);

  if (!location || isLoading) {
    return <Center h="100vh">Loading...</Center>;
  }

  if (error) {
    return <Center h="100vh">Error loading data</Center>;
  }

  // const valleys = ValleyMockData.map((valley) => {
  //   if (valley.name === '구름계곡' && xxLocation) {
  //     return {
  //       ...valley,
  //       latitude: xxLocation.latitude,
  //       longitude: xxLocation.longitude,
  //     };
  //   }
  //   if (valley.name === '굿굿계곡' && yyLocation) {
  //     return {
  //       ...valley,
  //       latitude: yyLocation.latitude,
  //       longitude: yyLocation.longitude,
  //     };
  //   }
  //   return valley;
  // });

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
          {valleys.map((valley) => (
            <CustomMapMarker
              key={valley.valley_id}
              src={valley.thumbnail}
              position={{ lat: valley.latitude, lng: valley.longitude }}
              label={valley.name}
            />
          ))}
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
        <ListComponent valleys={valleys} />
      </Box>
      <Box position="absolute" bottom="0" left="0" width="100%" zIndex="25">
        <TapBar />
      </Box>
    </Flex>
  );
};

export default MapPage;
