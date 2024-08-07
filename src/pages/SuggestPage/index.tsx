import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  Button,
  IconButton,
  useToast,
  Image,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { submitSuggest } from '../../api/Suggest';
import { Header } from '../../components/Common';
import Logo2 from '../../assets/images/Logo2.png';
import Layout from '../../components/Common/Layout';
import CustomButton from '../../components/Common/CustomButton';

const SuggestPage: React.FC = () => {
  const { valley_id, name } = useParams<{ valley_id: string; name: string }>();
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
      const urlsArray = filesArray.map((file) => URL.createObjectURL(file));
      setImageUrls((prevUrls) => [...prevUrls, ...urlsArray]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      'suggestPostRequest',
      new Blob(
        [
          JSON.stringify({
            title,
            content,
            valley_id,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    images.forEach((file) => formData.append('imageUrls', file));

    try {
      await submitSuggest(formData);
      toast({
        title: '제안이 성공적으로 제출되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: '제안 제출 실패',
        description: '제출하는 도중 오류가 발생했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Box bg="white" maxW="1023px" mx="auto" py="6" px="4" position="relative">
        <Header />
        <Box mt="14">
          <Flex justify="center" align="center" mt="4">
            <Image src={Logo2} alt="Logo" w="15%" />
            <Text
              textAlign="center"
              color="black"
              fontSize="20px"
              fontWeight="bold"
              fontFamily="Cafe24 Ssurround"
              ml="4"
              mt="1"
              mr="2"
            >
              정보 변경 제안
            </Text>
          </Flex>
          <Flex justify="left" align="center" mt="10" ml="85px" mb="10px">
            <MdLocationOn size="20" />
            <Text
              color="black"
              fontSize="15px"
              fontWeight="bold"
              fontFamily="Gmarket Sans TTF"
            >
              {name}
            </Text>
          </Flex>

          <Flex justify="center">
            <Input
              placeholder="제목"
              fontSize="15px"
              fontWeight="medium"
              fontFamily="Gmarket Sans TTF"
              color="#7C7C7C"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              borderRadius="full"
              boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
              bg="white"
              ml="80px"
              mr="80px"
              h="50px"
            />
          </Flex>
          <Flex justify="center">
            <Textarea
              placeholder="내용"
              fontSize="15px"
              fontWeight="medium"
              fontFamily="Gmarket Sans TTF"
              color="#7C7C7C"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              borderRadius="30px"
              boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
              bg="white"
              ml="80px"
              mr="80px"
              mt="20px"
              h="200px"
              resize="none"
              p="4"
            />
          </Flex>

          <Box
            color="#7C7C7C"
            borderRadius="30px"
            boxShadow="inset 0px 0px 4px 0.5px rgba(0, 0, 0, 0.25)"
            bg="white"
            ml="80px"
            mr="80px"
            mt="20px"
            h="150px"
            overflowX="scroll"
            display="flex"
            alignItems="center"
            p="4"
          >
            {imageUrls.length === 0 ? (
              <Flex w="full" h="full" justify="center" align="center">
                <Button
                  color="#7c7c7c"
                  fontSize={['md', 'lg', 'xl']}
                  fontWeight="medium"
                  fontFamily="Gmarket Sans TTF"
                  backgroundColor="transparent"
                  onClick={() =>
                    document.getElementById('image-upload')?.click()
                  }
                >
                  사진추가 +
                </Button>
              </Flex>
            ) : (
              <Flex h="full" align="center" mr="40px">
                {imageUrls.map((url, index) => (
                  <Box key={index} position="relative" mr="4" flex="0 0 auto">
                    <Image
                      src={url}
                      w="120px"
                      h="120px"
                      borderRadius="15px"
                      boxShadow="md"
                    />
                    <IconButton
                      aria-label="Remove image"
                      icon={<span>&times;</span>}
                      backgroundColor="transparent"
                      position="absolute"
                      top="0"
                      right="0"
                      fontSize="30px"
                      fontFamily="Gmarket Sans TTF"
                      fontWeight="medium"
                      onClick={() => handleImageRemove(index)}
                    />
                  </Box>
                ))}
                <Box pr="4">
                  <Box
                    w="120px"
                    h="120px"
                    display="flex"
                    justifyContent="center"
                    position="relative"
                    alignItems="center"
                    bg="#f9f9f9"
                    borderRadius="15px"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() =>
                      document.getElementById('image-upload')?.click()
                    }
                    flex="0 0 auto"
                  >
                    <Text
                      color="#7c7c7c"
                      fontSize="30px"
                      fontWeight="light"
                      fontFamily="Gmarket Sans TTF"
                    >
                      +
                    </Text>
                  </Box>
                </Box>
              </Flex>
            )}
            <Input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              display="none"
            />
          </Box>
          <Flex>
            <CustomButton
              onClick={handleSubmit}
              ButtonStyle={{
                background: 'linear-gradient(to right, #39643B, #59B86E)',
                color: 'white',
                borderRadius: 'full',
                width: '300px',
              }}
              mt="20px"
              h="50px"
              ml="80px"
              mr="80px"
            >
              제안하기
            </CustomButton>
          </Flex>
        </Box>
      </Box>
    </Layout>
  );
};

export default SuggestPage;
