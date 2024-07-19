import { Text, Flex, Image } from '@chakra-ui/react';
import { FC } from 'react';

interface CategoryButtonProps {
  iconSrc: string;
  label: string;
  alt: string;
}

const CategoryButton: FC<CategoryButtonProps> = ({ iconSrc, label, alt }) => {
  return (
    <Flex direction="column" align="center" justify="center" p={2}>
      <button
        onClick={() => {
          alert('button clicked');
        }}
      >
        <Image src={iconSrc} alt={alt} boxSize="50px" mb={2} />
        <Text fontSize="sm">{label}</Text>
      </button>
    </Flex>
  );
};

export default CategoryButton;
