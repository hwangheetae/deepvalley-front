import { Box, SimpleGrid } from '@chakra-ui/react';
import React, { FC } from 'react';
import CategoryButton from '../CategoryButton';
import waterfall from '../../../assets/icons/Category/waterfall.png';
import family from '../../../assets/icons/Category/family.png';
import happy from '../../../assets/icons/Category/happy.png';
import mountain from '../../../assets/icons/Category/mountain.png';
import parkinglot from '../../../assets/icons/Category/parkinglot.png';
import sea from '../../../assets/icons/Category/sea.png';
import swimmer from '../../../assets/icons/Category/swimmer.png';
import tent from '../../../assets/icons/Category/tent.png';

const Category: FC = () => {
  return (
    <Box
      w="full"
      maxW="428px"
      my={8}
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      <SimpleGrid columns={4} spacing={0}>
        {' '}
        <CategoryButton
          iconSrc={tent}
          label="야영가능"
          alt={'        Outdoor icons created by Freepik - Flaticon'}
        />
        <CategoryButton
          iconSrc={swimmer}
          label="물놀이가능"
          alt={'Swimming icons created by Freepik - Flaticon'}
        ></CategoryButton>
        <CategoryButton
          iconSrc={parkinglot}
          label="주차가능"
          alt={'Park icons created by Freepik - Flaticon'}
        />
        <CategoryButton
          iconSrc={family}
          label="가족동반"
          alt={'Family icons created by Flat Icons - Flaticon'}
        />
        <CategoryButton
          iconSrc={mountain}
          label="등산로"
          alt={'Mountain icons created by Freepik - Flaticon'}
        />
        <CategoryButton
          iconSrc={happy}
          label="애견동반"
          alt={'Dog icons created by AomAm - Flaticon'}
        />
        <CategoryButton
          iconSrc={sea}
          label="바다"
          alt={'Sea icons created by Yobany_MTOM - Flaticon'}
        />
        <CategoryButton
          iconSrc={waterfall}
          label="폭포"
          alt={'Waterfall icons created by Freepik - Flaticon'}
        />
      </SimpleGrid>
    </Box>
  );
};

export default React.memo(Category);
