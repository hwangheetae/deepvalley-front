export interface ReviewType {
  review_id: string;
  uuid: string;
  title: string;
  rating: string;
  content: string;
  visited_date: string;
  privacy: string;
  created_date: string;
  updated_date: string;
  tag_names: string[];
  image_urls: string[];
  valley_name: string;
  place_id: number;
  member_id: number;
}
