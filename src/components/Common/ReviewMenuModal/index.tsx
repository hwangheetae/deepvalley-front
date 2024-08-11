import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Button,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewId: string;
  onDelete: () => void;
}

const ReviewMenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  reviewId,
  onDelete,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent bg="white" maxW="50vw">
        <DrawerHeader>
          <IconButton
            aria-label="Close menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onClose}
          />
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <Flex direction="column" align="start">
            <Button
              as={Link}
              to={`/reviewUpdate/${reviewId}`}
              variant="ghost"
              colorScheme="blue"
              mb="4"
              width="100%"
              color="black"
              justifyContent="flex-start"
              pl="2"
              onClick={onClose}
            >
              리뷰 수정하기
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={onDelete}
              width="100%"
              color="black"
              justifyContent="flex-start"
              pl="2"
            >
              리뷰 삭제하기
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ReviewMenuModal;
