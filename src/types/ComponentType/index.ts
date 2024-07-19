import { CSSProperties, ReactNode } from 'react';
import {
  ButtonProps as ChakraButtonProps,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

//Common
export interface CategoryButtonProps {
  iconSrc: string;
  label: string;
  alt: string;
}

export interface CustomButtonProps extends ChakraButtonProps {
  ButtonStyle?: CSSProperties;
}

export interface CustomInputProps extends ChakraInputProps {
  inputStyle?: CSSProperties;
}

export interface HeaderProps {
  title: string;
  showMenuButton?: boolean;
  showBorderBottom?: boolean;
}
export interface LayoutProps {
  children: ReactNode;
  hasHeader?: boolean;
  hasTapBar?: boolean;
}

export interface MainPageHeaderProps {
  title: string;
  showMenuButton?: boolean;
  showBorderBottom?: boolean;
  fontFamily?: string;
}

//Image
export interface InstaImageProps {
  src: string;
}

export interface ProfileImageProps {
  src?: string;
}

export interface ReviewImageProps {
  src: string;
}
