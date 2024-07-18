import { useState } from 'react';
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
} from '@chakra-ui/react';
import Layout from '../components/Common/Layout';
import Header from '../components/Common/Header';
import CustomButton from '../components/Common/CustomButton';
import CustomInput from '../components/Common/CustomInput';
import InstaImage from '../components/Common/Image/InstaImage';
import {
  submitReview,
  uploadImages,
} from '../api/ReviewWritingApi/ReviewWritingApi';
import { ReviewWritingType } from '../types/ReviewWritingType/ReviewWritingType';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CloseIcon } from '@chakra-ui/icons';

const ReviewWritingPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('ZERO');
  const [content, setContent] = useState('');
  const [visitedDate, setVisitedDate] = useState<Date | null>(new Date());
  const [privacy, setPrivacy] = useState('PUBLIC');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const predefinedTags = [
    '캠핑가능',
    '수영가능',
    '주차가능',
    '애견동반가능',
    '가족단위',
  ];

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles((prevImages) => prevImages.concat(filesArray));
      const urlsArray = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls((prevUrls) => prevUrls.concat(urlsArray));
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
      //   const uploadedImageUrls = await uploadImages(imageFiles);

      const reviewData: ReviewWritingType = {
        title,
        rating,
        content,
        visited_date: visitedDate
          ? visitedDate.toISOString().split('T')[0]
          : '',
        privacy,
        place_id: 'b',
        tag_names: tags,
        // image_urls: uploadedImageUrls,
        image_urls: [
          'https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
      };

      await submitReview(reviewData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <Header title="" showMenuButton={false} showBorderBottom={false} />
        <Box p="4" pt="20">
          <Text>리뷰가 성공적으로 업로드 되었습니다!</Text>
          <Link to="/">
            <Button mt="4">메인 페이지로 이동</Button>
          </Link>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header title="" showMenuButton={false} showBorderBottom={false} />
      <Box p="4" pt="20">
        <CustomInput
          placeholder="리뷰 제목을 입력해 주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputStyle={{ marginBottom: '16px' }}
        />

        <Text mb="2">평점을 입력해 주세요</Text>
        <HStack spacing={1} mb="4">
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

        <Text mb="2">선택한 사진</Text>
        <Flex overflowX="scroll" mb="4">
          {imageUrls.map((url, index) => (
            <Box key={index} minW="150px" mr="4" position="relative">
              <InstaImage src={url} />
              <IconButton
                aria-label="Remove image"
                icon={<CloseIcon />}
                size="xs"
                position="absolute"
                top="2"
                right="2"
                onClick={() => handleImageRemove(index)}
              />
            </Box>
          ))}
        </Flex>

        <Button as="label" htmlFor="image-upload" mb="4">
          사진 추가
        </Button>
        <Input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        <Textarea
          placeholder="리뷰를 작성해 주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          mb="4"
        />

        <Text mb="2">방문한 날짜</Text>
        <DatePicker
          selected={visitedDate}
          onChange={(date: Date | null) => setVisitedDate(date)}
          dateFormat="yyyy년 MM월 dd일"
        />

        <Text mt="4" mb="2">
          태그 선택
        </Text>
        <Flex mb="4" wrap="wrap">
          {predefinedTags.map((tag) => (
            <Tag
              key={tag}
              size="lg"
              colorScheme={tags.includes(tag) ? 'green' : 'gray'}
              onClick={() => handleTagClick(tag)}
              cursor="pointer"
              mr="2"
              mb="2"
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
                colorScheme="green"
                onClick={() => handleTagClick(tag)}
                cursor="pointer"
                mr="2"
                mb="2"
              >
                <TagLabel>{`#${tag}`}</TagLabel>
              </Tag>
            ))}
        </Flex>
        <Flex>
          <Input
            placeholder="새 태그 입력"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            size="sm"
            mb="2"
          />
          <Button onClick={handleAddNewTag} mb="2">
            +
          </Button>
        </Flex>

        <Text mb="2">공개 범위</Text>
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

        <CustomButton
          onClick={handleSubmit}
          ButtonStyle={{
            background: 'linear-gradient(to right, #39643B, #59B86E)',
            color: 'white',
          }}
        >
          리뷰 업로드
        </CustomButton>
      </Box>
    </Layout>
  );
};

export default ReviewWritingPage;
