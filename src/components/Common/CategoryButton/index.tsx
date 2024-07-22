import { Text, Flex, Image } from '@chakra-ui/react';
import { FC } from 'react';
import { CategoryButtonProps } from '../../../types/ComponentType';

const CategoryButton: FC<CategoryButtonProps> = ({ iconSrc, label, alt }) => {
  return (
    <Flex direction="column" align="center" justify="center" p={2}>
      <button
        onClick={() => {
          alert('button clicked');
        }}
        style={{
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          borderRadius: '8px',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = '#f0f0f0';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            'transparent';
        }}
      >
        <Image src={iconSrc} alt={alt} boxSize="50px" mb={2} />
      </button>
      <Text fontSize="sm">{label}</Text>
    </Flex>
  );
};

export default CategoryButton;
