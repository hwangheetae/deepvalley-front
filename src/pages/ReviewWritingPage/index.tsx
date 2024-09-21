import React, { useState, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSuccessToast from '../../hooks/useSuccessToast';
import useRatingErrorToast from '../../hooks/useRatingErrorToast';
import useErrorToast from '../../hooks/useErrorToast';
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  Textarea,
  Tag,
  TagLabel,
  IconButton,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import Layout from '../../components/Common/Layout';
import Header from '../../components/Common/Header';
import CustomButton from '../../components/Common/CustomButton';
import CustomInput from '../../components/Common/CustomInput';
import InstaImage from '../../components/Common/Image/InstaImage';
import { submitReview } from '../../api/Review/index';
import { ReviewWritingType } from '../../types/ReviewWritingType';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { 에러404, 서버오류 } from '../../constant/constant';
import { logout } from '../../api/Auth/AuthService';
import { resizeImage } from '../../hooks/resizeImage';

const CustomDatePickerInput = forwardRef(
  ({ value, onClick }: any, ref: any) => (
    <Button
      onClick={onClick}
      ref={ref}
      variant="outline"
      fontWeight="light"
      fontSize="18px"
      fontFamily="Gmarket Sans TTF"
      justifyContent="flex-end"
      rightIcon={<ChevronDownIcon />}
      width="200px"
      border="none"
    >
      {value || '날짜 선택'}
    </Button>
  ),
);

const ReviewWritingPage: React.FC = () => {
  const location = useLocation();
  const { valley_id, thumbnail } = location.state as {
    valley_id: string;
    thumbnail: string;
  };

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [rating, setRating] = useState('ZERO');
  const [content, setContent] = useState('');
  const [visitedDate, setVisitedDate] = useState<Date | null>(new Date());
  const [privacy, setPrivacy] = useState('PUBLIC');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { successToast } = useSuccessToast();
  const { ratingErrorToast } = useRatingErrorToast();
  const { errorToast } = useErrorToast();

  const predefinedTags = [
    '캠핑가능',
    '수영가능',
    '주차가능',
    '애견동반가능',
    '가족단위',
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setTitle(e.target.value);
      setTitleError('');
    } else {
      setTitleError('제목은 10자 이하로 입력해 주세요.');
    }
  };

  const handleRatingClick = (rate: string) => {
    const ratingMap: { [key: string]: string } = {
      '0': 'ZERO',
      '1': 'ONE',
      '2': 'TWO',
      '3': 'THREE',
      '4': 'FOUR',
      '5': 'FIVE',
    };
    const reverseRatingMap: { [key: string]: string } = {
      ZERO: '0',
      ONE: '1',
      TWO: '2',
      THREE: '3',
      FOUR: '4',
      FIVE: '5',
    };

    const currentRating = parseInt(reverseRatingMap[rating]);

    if (currentRating === parseInt(rate)) {
      const newRating = (currentRating - 1).toString();
      setRating(ratingMap[newRating]);
    } else {
      setRating(ratingMap[rate]);
    }
  };

  const handleTagClick = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      try {
        // 파일들을 각각 리사이징 처리
        const resizedFiles = await Promise.all(
          filesArray.map(async (file) => {
            const optimizedFile = await resizeImage(file, 200, 200);
            return optimizedFile;
          }),
        );

        // 리사이즈된 파일의 Blob URL 생성 및 상태 업데이트
        const urlsArray = resizedFiles.map((file) => URL.createObjectURL(file));

        setImageFiles((prevImages) => prevImages.concat(resizedFiles));
        setImageUrls((prevUrls) => prevUrls.concat(urlsArray));
      } catch (error) {
        console.error('Error optimizing image:', error);
      }
    }
  };

  const handleImageRemove = (index: number) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handlePrivacyClick = (option: string) => {
    const privacyMap: { [key: string]: string } = {
      공개: 'PUBLIC',
      비공개: 'PRIVATE',
      '일부 공개': 'FOLLOWERS',
    };
    setPrivacy(privacyMap[option]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const reviewData: ReviewWritingType = {
        title,
        rating,
        content,
        visited_date: visitedDate
          ? visitedDate.toISOString().split('T')[0]
          : '',
        privacy,
        place_id: valley_id,
        tag_names: tags,
        image_urls: [],
      };
      const reviewDataBlob = new Blob([JSON.stringify(reviewData)], {
        type: 'application/json',
      });
      formData.append('reviewPostRequest', reviewDataBlob);

      imageFiles.forEach((file) => formData.append('imageUrls', file));

      await submitReview(formData);

      successToast({
        title: '리뷰 작성 성공!',
        description: '리뷰가 성공적으로 작성되었습니다.',
      });

      navigate(-1);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;

        switch (statusCode) {
          case 400:
            ratingErrorToast({
              title: '리뷰 작성 실패!',
              description: '평점을 입력해 주세요.',
            });
            break;
          case 403:
            logout();
            navigate('/errorpage');
            break;
          case 404:
            errorToast(에러404);
            break;
          case 500:
            errorToast(서버오류);
            break;
          default:
            ratingErrorToast({
              title: '리뷰 작성 실패!',
              description: '알 수 없는 오류가 발생했습니다.',
            });
            break;
        }
      } else {
        ratingErrorToast({
          title: '리뷰 작성 실패!',
          description: '알 수 없는 오류가 발생했습니다.',
        });
      }
    }
  };

  return (
    <Layout>
      <Header
        title=""
        showMenuButton={false}
        showBorderBottom={false}
        bg="transparent"
        MenuColor="white"
      />
      <Box pt="20">
        <Box position="relative" mb="4">
          <Box
            backgroundImage={`url(${thumbnail})`}
            backgroundSize="cover"
            backgroundPosition="center"
            height="250px"
            width="100%"
            position="absolute"
            top="-20"
            left="50%"
            transform="translateX(-50%)"
            zIndex="-1"
          />
          <Box
            backgroundColor="rgba(0, 0, 0, 0.5)"
            height="250px"
            width="100%"
            position="absolute"
            top="-20"
            left="50%"
            transform="translateX(-50%)"
            zIndex="-0.5"
          />

          <FormControl isInvalid={!!titleError}>
            <CustomInput
              placeholder="리뷰 제목을 입력해 주세요"
              value={title}
              onChange={handleTitleChange}
              inputStyle={{
                fontFamily: 'Gmarket Sans TTF',
                border: 'none',
                background: 'transparent',
                fontWeight: 'bold',
                fontSize: '24px',
                position: 'relative',
                zIndex: '1',
                color: 'white',
                borderColor: titleError ? 'none' : 'none',
                borderRadius: '100',
              }}
              _placeholder={{ color: 'white' }}
            />
            <FormErrorMessage ml={5}>{titleError}</FormErrorMessage>
          </FormControl>
          <Box p="4">
            <Text
              fontFamily="Gmarket Sans TTF"
              mb="2"
              fontWeight="light"
              position="relative"
              zIndex="1"
              color="white"
            >
              평점을 입력해 주세요
            </Text>
            <HStack spacing={1} mb="4" position="relative" zIndex="1">
              {[1, 2, 3, 4, 5].map((num) => (
                <Box
                  key={num}
                  onClick={() => handleRatingClick(num.toString())}
                  cursor="pointer"
                  color={
                    rating === 'ONE' && num === 1
                      ? 'yellow.400'
                      : rating === 'TWO' && num <= 2
                        ? 'yellow.400'
                        : rating === 'THREE' && num <= 3
                          ? 'yellow.400'
                          : rating === 'FOUR' && num <= 4
                            ? 'yellow.400'
                            : rating === 'FIVE' && num <= 5
                              ? 'yellow.400'
                              : 'gray.300'
                  }
                  fontSize="30px"
                >
                  ★
                </Box>
              ))}
            </HStack>
          </Box>
        </Box>
        <Box p="4">
          <Flex alignItems="center" mb="2">
            <Text
              fontWeight="bold"
              fontSize="20px"
              fontFamily="Gmarket Sans TTF"
            >
              선택한 사진
            </Text>
            <Button
              as="label"
              htmlFor="image-upload"
              ml="180px"
              mt="5px"
              borderRadius="full"
              fontWeight="light"
              border="1px solid black"
              bg="transparent"
              width="100px"
              height="25px"
              top="-5px"
              fontSize="15px"
              fontFamily="Gmarket Sans TTF"
            >
              + 사진 추가
            </Button>
          </Flex>
          <Input
            type="file"
            id="image-upload"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <Flex overflowX="scroll" mb="4" ml="2" mr="2">
            {imageUrls.map((url, index) => (
              <Box
                key={index}
                minW="150px"
                mr="4"
                position="relative"
                boxShadow="md"
              >
                <InstaImage src={url} />
                <IconButton
                  aria-label="Remove image"
                  icon={<CloseIcon />}
                  size="xs"
                  position="absolute"
                  top="2"
                  right="2"
                  onClick={() => handleImageRemove(index)}
                  bg="transparent"
                  border="none"
                />
              </Box>
            ))}
          </Flex>

          <Box mt="3" height="1px" bg="#EFEFEF" mb="4" />

          <Text
            mb="2"
            fontWeight="bold"
            fontSize="20px"
            fontFamily="Gmarket Sans TTF"
          >
            리뷰 작성
          </Text>
          <Flex ml="1" mr="1">
            <Textarea
              placeholder="리뷰를 작성해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              mb="4"
              bg="#EDECEC"
              border="none"
              _placeholder={{ color: 'gray.600' }}
              borderRadius="0"
              fontFamily="Gmarket Sans TTF"
              fontWeight="light"
            />
          </Flex>

          <Box mt="3" height="1px" bg="#EFEFEF" mb="4" />

          <Flex alignItems="center" mb="2">
            <Text
              mb="2"
              mt="2"
              fontWeight="bold"
              fontSize="20px"
              fontFamily="Gmarket Sans TTF"
            >
              방문한 날짜
            </Text>
            <Box ml="auto">
              <DatePicker
                selected={visitedDate}
                onChange={(date: Date | null) => setVisitedDate(date)}
                dateFormat="yyyy년 MM월 dd일"
                customInput={<CustomDatePickerInput />}
              />
            </Box>
          </Flex>

          <Box height="1px" bg="#EFEFEF" mb="4" />

          <Text
            mt="4"
            mb="2"
            fontFamily="Gmarket Sans TTF"
            fontSize="20px"
            fontWeight="bold"
          >
            태그 선택
          </Text>
          <Flex mb="4" wrap="wrap">
            {predefinedTags.map((tag) => (
              <Tag
                key={tag}
                size="lg"
                cursor="pointer"
                mr="2"
                mb="2"
                onClick={() => handleTagClick(tag)}
                borderRadius="full"
                fontFamily="Gmarket Sans TTF"
                fontWeight="medium"
                border="1px solid #306839"
                boxShadow="inner 25px 25px 10px 5px rgba(0, 0, 0, 0.5)"
                backgroundColor={
                  tags.includes(tag) ? 'rgba(0, 69, 11, 0.81)' : 'transparent'
                }
                color={tags.includes(tag) ? 'white' : 'black'}
              >
                <TagLabel>{`#${tag}`}</TagLabel>
              </Tag>
            ))}
            {tags
              .filter((tag) => !predefinedTags.includes(tag))
              .map((tag) => (
                <Tag
                  key={tag}
                  size="lg"
                  cursor="pointer"
                  mr="2"
                  mb="2"
                  borderRadius="full"
                  onClick={() => handleTagClick(tag)}
                  fontFamily="Gmarket Sans TTF"
                  fontWeight="medium"
                  border="1px solid #306839"
                  boxShadow="inner 25px 25px 10px 5px rgba(0, 0, 0, 0.5)"
                  backgroundColor={
                    tags.includes(tag) ? 'rgba(0, 69, 11, 0.81)' : 'transparent'
                  }
                  color={tags.includes(tag) ? 'white' : 'black'}
                >
                  <TagLabel>{`#${tag}`}</TagLabel>
                </Tag>
              ))}
          </Flex>
          <Flex mt="-16px" wrap="wrap">
            <Input
              placeholder="새 태그 입력"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              size="md"
              mr="2"
              mb="2"
              borderRadius="full"
              boxShadow="inner 25px 25px 10px 5px rgba(0, 0, 0, 0.5)"
              backgroundColor="transparent"
              fontFamily="Gmarket Sans TTF"
              fontWeight="medium"
              border="1px solid #306839"
              width="120px"
              height="32px"
            />
            <Button
              onClick={handleAddNewTag}
              mb="2"
              size="md"
              mr="2"
              borderRadius="full"
              boxShadow="inner 25px 25px 10px 5px rgba(0, 0, 0, 0.5)"
              backgroundColor="transparent"
              fontFamily="Gmarket Sans TTF"
              fontWeight="medium"
              border="1px solid #306839"
              height="32px"
            >
              +
            </Button>
          </Flex>

          <Box mt="3" height="1px" bg="#EFEFEF" mb="4" />

          <Text
            mb="2"
            fontFamily="Gmarket Sans TTF"
            fontSize="20px"
            fontWeight="bold"
          >
            공개 범위
          </Text>
          <VStack align="start" mb="4">
            {['공개', '일부 공개', '비공개'].map((option) => (
              <Button
                key={option}
                variant={
                  privacy === 'PUBLIC' && option === '공개'
                    ? 'solid'
                    : privacy === 'PRIVATE' && option === '비공개'
                      ? 'solid'
                      : privacy === 'FOLLOWERS' && option === '일부 공개'
                        ? 'solid'
                        : 'outline'
                }
                onClick={() => handlePrivacyClick(option)}
                width="full"
              >
                {option}
              </Button>
            ))}
          </VStack>

          <Flex justifyContent="center">
            <CustomButton
              onClick={handleSubmit}
              ButtonStyle={{
                background: 'linear-gradient(to right, #39643B, #59B86E)',
                color: 'white',
                borderRadius: 'full',
                width: '300px',
              }}
            >
              리뷰 업로드
            </CustomButton>
          </Flex>
        </Box>
      </Box>
    </Layout>
  );
};

export default ReviewWritingPage;
