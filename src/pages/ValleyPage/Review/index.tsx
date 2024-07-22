import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Avatar,
  HStack,
  VStack,
} from '@chakra-ui/react';

const Review: React.FC = () => {
  return (
    <Box p={4} mt="60px">
      <HStack spacing={4} mb={4}>
        <Avatar size="md" src="profile_image_url" />
        <Text fontSize="lg" fontWeight="bold">
          nickname
        </Text>
        <Button colorScheme="green" variant="outline">
          + 팔로우
        </Button>
      </HStack>

      <Flex mb={4}>
        <Image
          boxSize="150px"
          src="valley1.png"
          alt="image1"
          borderRadius="md"
          mr={2}
        />
        <Image
          boxSize="150px"
          src="valley1.png"
          alt="image2"
          borderRadius="md"
          mr={2}
        />
        <Image
          boxSize="150px"
          src="valley1.png"
          alt="image2"
          borderRadius="md"
        />
      </Flex>

      <VStack align="start" mb={4}>
        <Text fontSize="md" fontWeight="bold">
          청계천이 좋드라구요
        </Text>
        <Text>
          청계천은 서울 도심을 가로지르는 계곡으로 인조섬에서 발원한다. 수질
          보호지역으로 인하여 놀러온 친구들과 깨끗한 자연을 즐길 수 있다. 한적한
          계곡이어서 도시의 소음을 피할 수 있어 편안하다. 정기적으로 정화 작업을
          해서 깨끗함이 유지되고 있다. 가족과 함께 오기 좋은 곳이다.
        </Text>
      </VStack>

      <Button colorScheme="green" width="100%">
        리뷰작성하기
      </Button>
    </Box>
  );
};

export default Review;
