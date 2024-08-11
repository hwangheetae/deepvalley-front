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
  Radio,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Layout from '../../components/Common/Layout';
import Header from '../../components/Common/Header';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { Star, Water } from '@mui/icons-material';
import TapBar from '../../components/Common/TapBar';
import { fetchValleysByFilter, fetchRegions } from '../../api/ValleyApi';
import { ValleysType } from '../../types';
import axios from 'axios';

const predefinedTags = [
  '야영가능',
  '주차가능',
  '물놀이가능',
  '가족동반',
  '등산로',
];

const SearchPage: React.FC = () => {
  const { valleys: initialValleys, tag: initialTag } = useLoaderData() as {
    valleys: ValleysType[];
    tag: string | null;
  };
  const [valleys, setValleys] = useState<ValleysType[]>(initialValleys);
  const [keyword, setKeyword] = useState<string>('');
  const [filters, setFilters] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [region, setRegion] = useState<string>('');
  const [tags, setTags] = useState<string[]>(initialTag ? [initialTag] : []);
  const [regions, setRegions] = useState<string[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [regionOpen, setRegionOpen] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [sortType, setSortType] = useState<string>('');
  const [tempRegion, setTempRegion] = useState<string>('');
  const [tempTags, setTempTags] = useState<string[]>([]);
  const [tempSortType, setTempSortType] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const regions = await fetchRegions();
        setRegions(regions);
      } catch (error) {
        console.error('Failed to fetch regions', error);
        toast({
          title: '지역 정보를 불러오는 데 실패했습니다.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchRegionData();
  }, []);

  const handleSearch = async (keyword: string) => {
    setOffset(0);
    setHasMore(true);
    const newFilters = { ...filters, region, keyword, sort_type: sortType };
    try {
      const response = await fetchValleysByFilter(newFilters);
      setValleys(response);
    } catch (error) {
      console.error('Failed to fetch valleys', error);
      toast({
        title: '계곡 정보를 불러오는 데 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const applyFilters = async () => {
    setOffset(0);
    setHasMore(true);
    const newFilters = {
      region: tempRegion,
      tag_names: tempTags,
      keyword,
      sort_type: tempSortType,
    };
    try {
      const response = await fetchValleysByFilter(newFilters);
      setValleys(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 400:
            toast({
              title: '잘못된 요청입니다.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            break;
          case 403:
            toast({
              title: '권한이 없습니다.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            navigate('/errorpage');
            break;
          default:
            toast({
              title: '계곡 정보를 불러오는 데 실패했습니다.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
        }
      } else {
        toast({
          title: '계곡 정보를 불러오는 데 실패했습니다.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setFilters(newFilters);
    setRegion(tempRegion);
    setTags(tempTags);
    setSortType(tempSortType);
    onClose();
  };

  const handleSortChange = (value: string) => {
    setTempSortType(value);
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
    const newFilters = {
      region,
      tag_names: updatedTags,
      keyword,
      sort_type: sortType,
    };
    setOffset(0);
    setHasMore(true);
    try {
      const response = await fetchValleysByFilter(newFilters);
      setValleys(response);
    } catch (error) {
      console.error('Failed to fetch valleys', error);
      toast({
        title: '계곡 정보를 불러오는 데 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setRegion('');
    setTags([]);
    setKeyword('');
    setSortType('');
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
        sort_type: sortType,
      });
      if (response.length === 0) {
        setHasMore(false);
      } else {
        setValleys((prevValleys) => [...prevValleys, ...response]);
      }
    } catch (error) {
      console.error('Failed to fetch more valleys', error);
      toast({
        title: '추가 계곡 정보를 불러오는 데 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOpenModal = () => {
    setTempRegion(region);
    setTempTags(tags);
    setTempSortType(sortType);
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
    <Layout>
      <Header title="검색" />
      <Box mt={20} px={4}>
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
            boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
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
            backgroundColor="transparent"
            color="black"
            flexShrink={0}
            boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
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
            backgroundColor="transparent"
            color="black"
            flexShrink={0}
            boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
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
              boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
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
        <Box mt={4} mb={14}>
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
                        <Text fontSize="sm">{valley.avg_rating}</Text>
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
                  boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
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
                  mt={0}
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
                        boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
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

              <Divider width="350px" height="1px" background="#EFEFEF" />

              <Box width="100%">
                <Text
                  color="#000"
                  fontFamily="Gmarket Sans TTF"
                  fontWeight="500"
                  lineHeight="normal"
                  mb="2"
                >
                  정렬
                </Text>
                <HStack spacing={4}>
                  <Flex
                    alignItems="center"
                    onClick={() => handleSortChange('')}
                    cursor="pointer"
                  >
                    <Radio
                      value=""
                      isChecked={tempSortType === ''}
                      size="lg"
                      colorScheme="green"
                    />
                    <Text
                      color="#000"
                      textAlign="center"
                      fontFamily="Gmarket Sans TTF"
                      fontWeight="500"
                      ml="2"
                    >
                      기본순
                    </Text>
                  </Flex>
                  <Flex
                    alignItems="center"
                    onClick={() => handleSortChange('post_count')}
                    cursor="pointer"
                  >
                    <Radio
                      value="post_count"
                      isChecked={tempSortType === 'post_count'}
                      size="lg"
                      colorScheme="green"
                    />
                    <Text
                      color="#000"
                      textAlign="center"
                      fontFamily="Gmarket Sans TTF"
                      fontWeight="500"
                      ml="2"
                    >
                      리뷰순
                    </Text>
                  </Flex>
                  <Flex
                    alignItems="center"
                    onClick={() => handleSortChange('avg_rating')}
                    cursor="pointer"
                  >
                    <Radio
                      value="avg_rating"
                      isChecked={tempSortType === 'avg_rating'}
                      size="lg"
                      colorScheme="green"
                    />
                    <Text
                      color="#000"
                      textAlign="center"
                      fontFamily="Gmarket Sans TTF"
                      fontWeight="500"
                      ml="2"
                    >
                      평점순
                    </Text>
                  </Flex>
                </HStack>
              </Box>

              <Divider width="350px" height="1px" background="#EFEFEF" />

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
                    boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
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
      <TapBar />
    </Layout>
  );
};

export default SearchPage;
