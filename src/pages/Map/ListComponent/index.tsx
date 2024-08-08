import { useState, useEffect, FC } from 'react';
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
  selectedValley: ValleysType | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setHeight: (height: string) => void;
}

const ListComponent: FC<ListComponentProps> = ({
  visibleValleys,
  selectedValley,
  isOpen,
  setIsOpen,
  setHeight,
}) => {
  const [sortedValleys, setSortedValleys] = useState<ValleysType[]>([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHeight(isOpen ? '13%' : '80%');
  };

  useEffect(() => {
    if (selectedValley) {
      const updatedValleys = [
        selectedValley,
        ...visibleValleys.filter(
          (valley) => valley.valley_id !== selectedValley.valley_id,
        ),
      ];
      setSortedValleys(updatedValleys);
    } else {
      setSortedValleys(visibleValleys);
    }
  }, [visibleValleys, selectedValley]);

  return (
    <Box
      position="absolute"
      bottom="1"
      left="0"
      width="100%"
      height={isOpen ? '80%' : '12%'}
      bg="white"
      transition="height 0.3s ease-in-out"
      borderTopRadius="lg"
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.2)"
      zIndex="20"
    >
      <Box onClick={handleToggle} mt={2} alignContent="center">
        <Center>
          <Box
            width="30%"
            height="10px"
            bg="gray.400"
            borderRadius="full"
            mt={2}
            mb={4}
          />
        </Center>
      </Box>
      {isOpen && (
        <VStack p={4} spacing={2} overflowY="auto" maxHeight="calc(90% - 30px)">
          {sortedValleys.map((valley, index) => (
            <ChakraLink
              as={RouterLink}
              to={`/valley/${valley.valley_id}/detail`}
              w="100%"
              key={index}
            >
              <Box
                p={2}
                borderWidth="1px"
                borderRadius="lg"
                w="100%"
                boxShadow="md"
                borderColor={
                  valley.valley_id === selectedValley?.valley_id
                    ? 'green.500'
                    : 'gray.200'
                }
                borderStyle="solid"
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
                      <Text fontSize="sm">{valley.avg_depth}m</Text>
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
