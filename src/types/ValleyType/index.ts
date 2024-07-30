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
}

export interface ValleyDetailType {
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
}
