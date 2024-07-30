import { useState, FC } from 'react';
import {
  Box,
  Text,
  Center,
  VStack,
  Image,
  HStack,
  Icon,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Star, Water } from '@mui/icons-material';
import { ValleysType } from '../../../types';
import { Link as RouterLink } from 'react-router-dom';

interface ListComponentProps {
  visibleValleys: ValleysType[];
}

const ListComponent: FC<ListComponentProps> = ({ visibleValleys }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState('13%');

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHeight(isOpen ? '13%' : '80%');
  };

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
        <Box
          width="60px"
          height="5px"
          bg="gray.400"
          borderRadius="full"
          mt={2}
        />
      </Center>
      {isOpen && (
        <VStack p={4} spacing={2}>
          {visibleValleys.map((valley, index) => (
            <ChakraLink
              as={RouterLink}
              to={`/ValleyPage/${valley.valley_id}`}
              w="100%"
              key={index}
            >
              <Box
                p={2}
                borderWidth="1px"
                borderRadius="lg"
                w="100%"
                boxShadow="md"
              >
                <HStack spacing={4}>
                  <Image
                    src={valley.thumbnail}
                    alt={valley.name}
                    borderRadius="lg"
                    boxSize="140px"
                    objectFit="cover"
                  />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">
                      {valley.name}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {valley.address}
                    </Text>
                    <HStack spacing={2}>
                      <Icon as={Water} color="blue.500" />
                      <Text fontSize="sm">{valley.max_depth}m</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={Star} color="yellow.500" />
                      <Text fontSize="sm">{valley.rating}</Text>
                      <Text fontSize="sm" color="gray.500">
                        리뷰 {valley.post_count}개
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            </ChakraLink>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default ListComponent;
