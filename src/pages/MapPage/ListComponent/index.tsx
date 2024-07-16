import React, { useState } from 'react';
import { Box, Text, Center, VStack, Image } from '@chakra-ui/react';

const ListComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState('13%'); // 초기 높이 설정

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHeight(isOpen ? '13%' : '80%');
  };

  const locations = [
    {
      name: '구름계곡',
      latitude: 37.495,
      longitude: 127.037,
      address: '경기도 성남시 판교면 11-1',
      imageUrl: '받아올 이미지 1',
    },
    {
      name: '굿굿계곡',
      latitude: 37.496,
      longitude: 127.038,
      address: '경기도 성남시 판교면 11-2',
      imageUrl: '받아올 이미지 2',
    },
    // 추가 데이터...
  ];

  return (
    <Box
      position="absolute"
      bottom="0"
      left="0"
      width="100%"
      height={height}
      bg="white"
      transition="height 0.3s ease-in-out"
      borderTopRadius="lg"
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.2)"
      onClick={handleToggle}
      zIndex="20"
    >
      <Center>
        <Text fontSize="lg" mt={2}>
          {isOpen ? '리스트 닫기' : '리스트 보기'}
        </Text>
      </Center>
      {isOpen && (
        <VStack p={4} spacing={2}>
          {locations.map((location, index) => (
            <Box
              key={index}
              p={2}
              borderWidth="1px"
              borderRadius="lg"
              w="90%"
              boxShadow="md"
            >
              <Image
                src={location.imageUrl}
                alt={location.name}
                borderRadius="lg"
                mb={2}
              />
              <Text fontWeight="bold">{location.name}</Text>
              <Text>{location.address}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default ListComponent;
