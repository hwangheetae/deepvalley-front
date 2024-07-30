import React from 'react';
import {
  Box,
  Text,
  Flex,
  Icon,
  HStack,
  VStack,
  Button,
} from '@chakra-ui/react';
import { StarIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  FaSwimmingPool,
  FaTimesCircle,
  FaCheckCircle,
  FaParking,
} from 'react-icons/fa';
import { ValleyDetailType } from '../../../types';

interface InfoProps {
  valley: ValleyDetailType;
}

const Info: React.FC<InfoProps> = ({ valley }) => {
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          {valley.name}
        </Text>
        <HStack spacing={2}>
          <Text fontSize="lg" fontWeight="bold">
            {valley.rating}
          </Text>
          <StarIcon color="yellow.400" />
          <Button size="sm" colorScheme="green">
            길찾기
          </Button>
          <Button size="sm" colorScheme="green" variant="outline">
            지도 보기
          </Button>
        </HStack>
      </Flex>
      <Text color="gray.500">{valley.region}</Text>
      <HStack spacing={4} my={4}>
        <Flex align="center">
          <Icon as={FaSwimmingPool} boxSize={6} color="red.500" />
          <Text ml={2}>수영</Text>
          <Icon as={FaTimesCircle} boxSize={4} color="red.500" />
        </Flex>
        <Flex align="center">
          <Icon as={FaCheckCircle} boxSize={6} color="green.500" />
          <Text ml={2}>취사 가능</Text>
        </Flex>
        <Flex align="center">
          <Icon as={FaParking} boxSize={6} color="green.500" />
          <Text ml={2}>주차장</Text>
        </Flex>
      </HStack>
      <VStack align="start" spacing={2}>
        <Text>주소: {valley.address}</Text>
        <Text>영업시간: {valley.opened ? '지금 영업 중' : '영업 종료'}</Text>
        <HStack spacing={2}>
          <PhoneIcon />
          <Text>전화번호: {valley.contact}</Text>
        </HStack>
        <Text>
          수심: 평균 {valley.avg_depth}M / 깊은 곳 {valley.max_depth}M
        </Text>
        <Text>수온: 24°C - 32°C</Text>
      </VStack>
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          실시간 혼잡도
        </Text>
        <Text>{valley.busy}</Text>
      </Box>
    </Box>
  );
};

export default Info;
