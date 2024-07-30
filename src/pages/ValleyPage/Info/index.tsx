import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Info: React.FC = () => {
  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold">
        수성동 계곡
      </Text>
      <Text>주소: 서울특별시 종로구 옥인동 185-3</Text>
      <Text>영업시간: 지금 영업 중</Text>
      <Text>전화번호: 02-2148-2844</Text>
      <Text>수심: 평균 4M / 깊은 곳 8M</Text>
      <Text>수온: 24°C - 32°C</Text>
      <Text>실시간 혼잡도: 월요일 가장 붐빔</Text>
    </Box>
  );
};

export default Info;
