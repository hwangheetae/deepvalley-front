import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  useDisclosure,
  VStack,
  HStack,
  Image,
  Text,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Flex,
  Tag,
  TagLabel,
  InputGroup,
  InputLeftElement,
  Collapse,
  SimpleGrid,
  Center,
  List,
  ListItem,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Layout from '../../components/Common/Layout';
import Header from '../../components/Common/Header';
import { useLoaderData, Link } from 'react-router-dom';
import { Star, Water } from '@mui/icons-material';

import { fetchValleysByFilter, fetchRegions } from '../../api/ValleyApi';
import { ValleysType } from '../../types';

const predefinedTags = [
  '수영가능',
  '캠핑가능',
  '주차가능',
  '애견동반가능',
  '가족단위',
];

const SearchPage: React.FC = () => {
  const { valleys: initialValleys } = useLoaderData() as {
    valleys: ValleysType[];
  };
  const [valleys, setValleys] = useState<ValleysType[]>(initialValleys);
  const [keyword, setKeyword] = useState<string>('');
  const [filters, setFilters] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [region, setRegion] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [regionOpen, setRegionOpen] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const [tempRegion, setTempRegion] = useState<string>('');
  const [tempTags, setTempTags] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const regions = await fetchRegions();
        setRegions(regions);
      } catch (error) {
        console.error('Failed to fetch regions', error);
      }
    };

    fetchRegionData();
  }, []);

  const handleSearch = async (keyword: string) => {
    setOffset(0);
    setHasMore(true);
    const newFilters = { ...filters, region, keyword };
    try {
      const response = await fetchValleysByFilter(newFilters);
      setValleys(response);
    } catch (error) {
      console.error('Failed to fetch valleys', error);
    }
  };

  const applyFilters = async () => {
    setOffset(0);
    setHasMore(true);
    const newFilters = { region: tempRegion, tag_names: tempTags, keyword };
    try {
      const response = await fetchValleysByFilter(newFilters);
      setValleys(response);
    } catch (error) {
      console.error('Failed to fetch valleys', error);
    }
    setFilters(newFilters);
    setRegion(tempRegion);
    setTags(tempTags);
    onClose();
  };

  const handleRegionClick = (region: string) => {
    setTempRegion(region);
    setFilteredRegions([]);
  };

  const handleTagClick = (tag: string) => {
    setTempTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handlePageTagClick = async (tag: string) => {
    const updatedTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    setTags(updatedTags);
    const newFilters = { region, tag_names: updatedTags, keyword };
    setOffset(0);
    setHasMore(true);
    try {
      const response = await fetchValleysByFilter(newFilters);
      setValleys(response);
    } catch (error) {
      console.error('Failed to fetch valleys', error);
    }
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setRegion('');
    setTags([]);
    setKeyword('');
    setFilters({});
    setValleys(initialValleys);
    setOffset(0);
    setHasMore(true);
  };

  const lastValleyElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((offset) => offset + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, filters, region, keyword],
  );

  useEffect(() => {
    if (offset > 0) {
      loadMoreValleys();
    }
  }, [offset]);

  const loadMoreValleys = async () => {
    try {
      console.log(offset);
      const response = await fetchValleysByFilter({
        ...filters,
        region,
        keyword,
        offset,
      });
      if (response.length === 0) {
        setHasMore(false);
      } else {
        setValleys((prevValleys) => [...prevValleys, ...response]);
      }
    } catch (error) {
      console.error('Failed to fetch more valleys', error);
    }
  };

  const handleOpenModal = () => {
    setTempRegion(region);
    setTempTags(tags);
    onOpen();
  };

  const handleRegionInputChange = (value: string) => {
    setTempRegion(value);
    if (value) {
      setFilteredRegions(
        regions.filter((region) =>
          region.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } else {
      setFilteredRegions([]);
    }
  };

  return (
    <Layout hasHeader>
      <Header title="검색" />
      <Box mt={4} px={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="black" />
          </InputLeftElement>
          <Input
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(keyword)}
            size="md"
            borderRadius="full"
            boxShadow="md"
            bg="white"
          />
        </InputGroup>
        <Flex mt={4} overflowX="auto" whiteSpace="nowrap" alignItems="center">
          <Tag
            size="lg"
            cursor="pointer"
            mr="2"
            mb="2"
            onClick={handleOpenModal}
            borderRadius="full"
            fontFamily="Gmarket Sans TTF"
            fontWeight="medium"
            border="1px solid #306839"
            boxShadow="inner"
            backgroundColor="transparent"
            color="black"
            flexShrink={0}
          >
            <TagLabel>필터</TagLabel>
          </Tag>
          <Tag
            size="lg"
            cursor="pointer"
            mr="2"
            mb="2"
            onClick={resetFilters}
            borderRadius="full"
            fontFamily="Gmarket Sans TTF"
            fontWeight="medium"
            border="1px solid #306839"
            boxShadow="inner"
            backgroundColor="transparent"
            color="black"
            flexShrink={0}
          >
            <TagLabel>초기화</TagLabel>
          </Tag>
          {predefinedTags.map((tag) => (
            <Tag
              key={tag}
              size="lg"
              cursor="pointer"
              mr="2"
              mb="2"
              onClick={() => handlePageTagClick(tag)}
              borderRadius="full"
              fontFamily="Gmarket Sans TTF"
              fontWeight="medium"
              border="1px solid #306839"
              boxShadow="inner"
              backgroundColor={
                tags.includes(tag) ? 'rgba(0, 69, 11, 0.81)' : 'transparent'
              }
              color={tags.includes(tag) ? 'white' : 'black'}
              flexShrink={0}
            >
              <TagLabel>{`#${tag}`}</TagLabel>
            </Tag>
          ))}
        </Flex>
        <Box mt={4}>
          <VStack spacing={4}>
            {valleys.map((valley, index) => {
              const valleyItem = (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  w="100%"
                  h="100%"
                  boxShadow="md"
                  as={Link}
                  to={`/valley/${valley.valley_id}/detail`}
                  ref={
                    index === valleys.length - 1 ? lastValleyElementRef : null
                  }
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
              );

              return valleyItem;
            })}
          </VStack>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius="40px"
          border="2px solid #306839"
          boxShadow="inner"
          maxWidth="400px"
          mx="auto"
        >
          <ModalHeader
            fontFamily="Gmarket Sans TTF"
            fontWeight="medium"
            textAlign="center"
          >
            필터
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="black" />
                </InputLeftElement>
                <Input
                  placeholder="지역명을 입력해주세요"
                  value={tempRegion}
                  onChange={(e) => handleRegionInputChange(e.target.value)}
                  size="md"
                  borderRadius="full"
                  boxShadow="md"
                  bg="white"
                />
                <Icon
                  as={regionOpen ? ChevronUpIcon : ChevronDownIcon}
                  cursor="pointer"
                  onClick={() => setRegionOpen(!regionOpen)}
                  position="absolute"
                  right="10px"
                  top="50%"
                  transform="translateY(-50%)"
                />
              </InputGroup>
              {filteredRegions.length > 0 && (
                <List
                  spacing={2}
                  mt={2}
                  maxHeight="150px"
                  overflowY="auto"
                  width="100%"
                  bg="white"
                  boxShadow="md"
                  borderRadius="md"
                >
                  {filteredRegions.map((region, index) => (
                    <ListItem
                      key={index}
                      cursor="pointer"
                      p={2}
                      borderRadius="md"
                      bg="gray.100"
                      onClick={() => handleRegionClick(region)}
                    >
                      {region}
                    </ListItem>
                  ))}
                </List>
              )}
              <Collapse in={regionOpen}>
                <Box maxH="200px" overflowY="auto" w="100%">
                  <SimpleGrid columns={4} spacing={4}>
                    {regions.map((region, index) => (
                      <Tag
                        key={index}
                        size="lg"
                        cursor="pointer"
                        onClick={() => handleRegionClick(region)}
                        borderRadius="full"
                        fontFamily="Gmarket Sans TTF"
                        fontWeight="medium"
                        border="1px solid #306839"
                        boxShadow="inner"
                        backgroundColor={
                          tempRegion === region
                            ? 'rgba(0, 69, 11, 0.81)'
                            : 'transparent'
                        }
                        color={tempRegion === region ? 'white' : 'black'}
                      >
                        <Center w="100%" h="100%">
                          <TagLabel>{region}</TagLabel>
                        </Center>
                      </Tag>
                    ))}
                  </SimpleGrid>
                </Box>
              </Collapse>
              <Box>
                <Text fontFamily="Gmarket Sans TTF" fontWeight="medium" mb={2}>
                  필터
                </Text>
                {predefinedTags.map((tag, index) => (
                  <Tag
                    key={index}
                    size="lg"
                    cursor="pointer"
                    onClick={() => handleTagClick(tag)}
                    borderRadius="full"
                    fontFamily="Gmarket Sans TTF"
                    fontWeight="medium"
                    border="1px solid #306839"
                    boxShadow="inner"
                    backgroundColor={
                      tempTags.includes(tag)
                        ? 'rgba(0, 69, 11, 0.81)'
                        : 'transparent'
                    }
                    color={tempTags.includes(tag) ? 'white' : 'black'}
                    m={1}
                  >
                    <TagLabel>{`#${tag}`}</TagLabel>
                  </Tag>
                ))}
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              취소
            </Button>
            <Button color="black" onClick={applyFilters}>
              적용
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default SearchPage;
