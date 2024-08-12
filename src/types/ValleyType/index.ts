import { ReactNode } from 'react';

export interface ValleysType {
  name: string;
  valley_id: string;
  thumbnail: string;
  address: string;
  region: string;
  latitude: number;
  longitude: number;
  max_depth: number;
  avg_depth: number;
  tag_names: string[];
  post_count: number;
  rating: string;
  busy: string;
  opened: boolean;
  avg_rating: number;
}

export interface ValleyDetailInfoType {
  tel: string;
  extra_info: string;
  content: string;
  name: string;
  valley_id: string;
  thumbnail: string;
  address: string;
  contact: string;
  region: string;
  latitude: number;
  longitude: number;
  max_depth: number;
  avg_depth: number;
  tag_names: string[];
  post_count: number;
  rating: string;
  busy: string;
  opened: boolean;
  opening_time: string;
  closing_time: string;
  opening_hours: ReactNode;
  avg_rating: string;
  tell: string;
}

export interface ValleyDetailReviewType {
  review_id: string;
  title: string;
  rating: string;
  content: string;
  visited_date: string;
  privacy: string;
  member_id: string;
  place_id: string;
  valley_name: string;
  created_date: string;
  updated_date: string;
  image_urls: string[];
  tag_names: string[];
  profile_image_url: string | null;
  member_name: string;
}

export interface ValleyDetailReviewResponseType {
  reviews: ValleyDetailReviewType[];
}

export interface ValleyDetailImageType {
  review_id: string;
  title: string;
  content: string;
  image_urls: string[];
  profile_image_url: string;
  member_name: string;
  member_id: string;
}
