import { Flex, Image, Box, Text } from '@chakra-ui/react';
import 산잉_슬픈 from '../../../assets/images/산잉_슬픈.png';

const ErrorComponent = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="40vh"
      p={5}
    >
      <Image src={산잉_슬픈} alt="슬픈 이미지" boxSize="100px" />
      <Box textAlign="center" py={6} px={2}>
        <Text color={'gray.500'} mb={6}>
          현재 컨텐츠를 이용할 수 없어요!
        </Text>
      </Box>
    </Flex>
  );
};

export default ErrorComponent;
