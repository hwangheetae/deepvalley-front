import React from 'react';
import { Box, Text, Flex, Icon, HStack, VStack } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import {
  FaSwimmingPool,
  FaTimesCircle,
  FaCheckCircle,
  FaParking,
} from 'react-icons/fa';
import { ValleyDetailType } from '../../../types';
import BusyChart from '../../../components/BusyChart';

interface InfoProps {
  valley: ValleyDetailType;
}

const Info: React.FC<InfoProps> = ({ valley }) => {
  return (
    <Box p={1}>
      <Box border="2px" borderColor="green.500" borderRadius="md" p={3} mb={4}>
        <HStack spacing={5} justifyContent="space-around">
          <Flex direction="column" align="center">
            <Box position="relative">
              <Icon as={FaSwimmingPool} boxSize={12} />
              <Icon
                as={FaTimesCircle}
                boxSize={6}
                color="red.500"
                position="absolute"
                bottom="0"
                right="0"
              />
            </Box>
            <Text mt={2} fontSize="lg">
              수영
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Box position="relative">
              <Icon
                as={FaCheckCircle}
                boxSize={6}
                color="green.500"
                position="absolute"
                bottom="0"
                right="0"
              />
              <Icon as={FaCheckCircle} boxSize={12} />
            </Box>
            <Text mt={2} fontSize="lg">
              취사 가능
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Box position="relative">
              <Icon as={FaParking} boxSize={12} />
              <Icon
                as={FaCheckCircle}
                boxSize={6}
                color="green.500"
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
        <Text>주소: {valley.address}</Text>
        <Text>영업시간: {valley.opened ? '지금 영업 중' : '영업 종료'}</Text>
        <HStack spacing={2}>
          <PhoneIcon />
          <Text>전화번호: {valley.contact}</Text>
        </HStack>
        <Text>
          수심: 평균 {valley.avg_depth}M / 깊은 곳 {valley.max_depth}M
        </Text>
      </VStack>
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          실시간 혼잡도
        </Text>
        <BusyChart />
        <Text>{valley.busy}</Text>
      </Box>
    </Box>
  );
};

export default Info;
