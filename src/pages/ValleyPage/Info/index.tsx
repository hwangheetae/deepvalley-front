import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Flex,
  Icon,
  HStack,
  VStack,
  Image,
  SimpleGrid,
  Divider,
  Button,
} from '@chakra-ui/react';
// import { PhoneIcon } from '@chakra-ui/icons';
import {
  FaSwimmer,
  FaCheckCircle,
  FaParking,
  FaCampground,
  FaQuestionCircle,
} from 'react-icons/fa';
import { ValleyDetailInfoType } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface InfoProps {
  valley: ValleyDetailInfoType;
}

interface WeatherData {
  dt: number;
  main: {
    temp: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    },
  ];
}

interface GroupedWeatherData {
  [key: string]: {
    오전: WeatherData[];
    오후: WeatherData[];
  };
}

const Info: React.FC<InfoProps> = ({ valley }) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const toggleFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const navigate = useNavigate();
  const handleChangeInfo = () => {
    navigate(`/suggest/${valley.valley_id}/${valley.name}`);
  };

  const getWeather = async (lat: string, lon: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`,
      );
      const data = await response.json();
      setWeatherData(data.list);
    } catch (error) {
      console.error('Failed to fetch weather data', error);
    }
  };

  const sanitizedExtraInfo = valley.extra_info
    .replace(/\\n/g, ' ')
    .replace(/\\t/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\t/g, ' ');
  const extraInfoObject = JSON.parse(sanitizedExtraInfo);
  const extraInfoString: string = Object.entries(extraInfoObject)
    .map(([key, value]) => {
      const sanitizedValue = (value as string)
        .replace(/<br\s*\/?>/gi, '')
        .trim();
      return `${key}: ${sanitizedValue}`;
    })
    .join('\n\n');

  useEffect(() => {
    getWeather(valley.latitude.toString(), valley.longitude.toString());
  }, [valley.latitude, valley.longitude]);

  const groupedWeatherData: GroupedWeatherData = weatherData.reduce(
    (acc: GroupedWeatherData, item: WeatherData) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('ko-KR', {
        weekday: 'short',
        day: 'numeric',
      });
      const time = new Date(item.dt * 1000).getHours();
      const period = time < 12 ? '오전' : '오후';
      if (!acc[date]) {
        acc[date] = { 오전: [], 오후: [] };
      }
      acc[date][period].push(item);
      return acc;
    },
    {},
  );

  const renderWeatherIcon = (periodData: WeatherData[]) => {
    if (periodData.length === 0) {
      return (
        <Image
          src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          alt="transparent icon"
          boxSize="40px"
          mx="auto"
        />
      );
    }
    const item = periodData[Math.floor(periodData.length / 2)];
    return (
      <Image
        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
        alt="Weather icon"
        boxSize="40px"
        mx="auto"
      />
    );
  };

  const getNextFiveDays = (data: GroupedWeatherData) => {
    const today = new Date().toLocaleDateString('ko-KR', {
      weekday: 'short',
      day: 'numeric',
    });
    const days = Object.keys(data);
    const startIndex = days.indexOf(today);
    const validStartIndex = startIndex >= 0 ? startIndex : 0;
    const endIndex = validStartIndex + 5;
    return days.slice(validStartIndex, endIndex);
  };

  const nextFiveDays = getNextFiveDays(groupedWeatherData);
  return (
    <Box p={3}>
      <Box
        border="2px"
        borderColor="green.500"
        borderRadius="lg"
        p={4}
        mb={4}
        borderWidth="4px"
      >
        <HStack spacing={5} justifyContent="space-around">
          <Flex direction="column" align="center">
            <Box position="relative">
              <Icon as={FaSwimmer} boxSize={12} />
              <Icon
                as={
                  valley.tag_names.includes('물놀이가능')
                    ? FaCheckCircle
                    : FaQuestionCircle
                }
                boxSize={6}
                color={
                  valley.tag_names.includes('물놀이가능')
                    ? 'green.500'
                    : 'blue.500'
                }
                position="absolute"
                bottom="0"
                right="0"
              />
            </Box>
            <Text mt={2} fontSize="lg">
              물놀이
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Box position="relative">
              <Icon
                as={
                  valley.tag_names.includes('야영가능')
                    ? FaCheckCircle
                    : FaQuestionCircle
                }
                boxSize={6}
                color={
                  valley.tag_names.includes('야영가능')
                    ? 'green.500'
                    : 'blue.500'
                }
                position="absolute"
                bottom="0"
                right="0"
              />
              <Icon as={FaCampground} boxSize={12} />
            </Box>
            <Text mt={2} fontSize="lg">
              야영
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Box position="relative">
              <Icon as={FaParking} boxSize={12} />
              <Icon
                as={
                  valley.tag_names.includes('주차가능')
                    ? FaCheckCircle
                    : FaQuestionCircle
                }
                boxSize={6}
                color={
                  valley.tag_names.includes('주차가능')
                    ? 'green.500'
                    : 'blue.500'
                }
                position="absolute"
                bottom="0"
                right="0"
              />
            </Box>
            <Text mt={2} fontSize="lg">
              주차장
            </Text>
          </Flex>
        </HStack>
      </Box>
      <VStack align="start" spacing={2}>
        <Text whiteSpace="pre-wrap" align="start">
          주소:{' '}
          <Box as="span" color="green.500">
            {valley.address}
          </Box>
        </Text>
        <Text whiteSpace="pre-wrap" align="start">
          영업시간:{' '}
          <Box as="span" color="green.500">
            {valley.opening_hours}
          </Box>
        </Text>
        <HStack spacing={2}>
          <Text whiteSpace="pre-wrap" align="start">
            전화번호:{' '}
            <Box as="span" color="green.500">
              {valley.tel.replace(/<br\s*\/?>/gi, '')}
            </Box>
          </Text>
        </HStack>
        <Text whiteSpace="pre-wrap" align="start">
          수심: 평균{' '}
          <Box as="span" color="green.500">
            {valley.avg_depth}M
          </Box>{' '}
          / 깊은 곳{' '}
          <Box as="span" color="green.500">
            {valley.max_depth}M
          </Box>
        </Text>

        <Text textAlign="left">
          {showFullContent
            ? valley.content
            : `${valley.content.substring(0, 100)}...`}
          {valley.content.length > 100 && (
            <Text
              as="span"
              color="gray.500"
              cursor="pointer"
              onClick={toggleFullContent}
            >
              {showFullContent ? ' 접기' : ' 더보기'}
            </Text>
          )}
        </Text>

        <Text
          color="blue.500"
          onClick={handleChangeInfo}
          textDecoration="underline"
          cursor="pointer"
        >
          정보변경 제안
        </Text>
        <Button onClick={toggleInfo} mb={2}>
          추가정보
        </Button>
        {showInfo && (
          <Text textAlign="left" whiteSpace="pre-wrap">
            {extraInfoString}
          </Text>
        )}
      </VStack>
      <Box mt={4}>
        <Box mt={4} p={4} bg="green.500" borderRadius="md" color="white">
          <Flex align="center">
            <Box flex="4">
              <SimpleGrid columns={6} spacing={4}>
                <Box>
                  <br />
                  <br />
                  <br />
                  <Text>오전</Text>
                  <Divider my={1} />
                  <Text>오후</Text>
                </Box>
                {nextFiveDays.map((date, index) => (
                  <Box key={index} textAlign="center">
                    <Text fontWeight="bold" mb={2}>
                      {date}
                    </Text>
                    <Box>
                      {renderWeatherIcon(groupedWeatherData[date].오전)}
                    </Box>
                    <Box>
                      {renderWeatherIcon(groupedWeatherData[date].오후)}
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Info;
