// ValleyMockData.ts

export type Valley = {
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
  rating: number;
  busy: boolean;
  opened: boolean;
};

const ValleyMockData: Valley[] = [
  {
    name: '구름계곡',
    valley_id: '1',
    thumbnail: 'valley1.png',
    address: '경기도 성남시 판교면 11-1',
    region: '경기도',
    latitude: 37.392,
    longitude: 127.127,
    max_depth: 2.5,
    avg_depth: 1.2,
    tag_names: ['가족', '자연'],
    post_count: 23,
    rating: 4.5,
    busy: false,
    opened: true,
  },
  {
    name: '굿굿계곡',
    valley_id: '2',
    thumbnail: 'valley1.png',
    address: '경기도 성남시 판교면 11-2',
    region: '경기도',
    latitude: 37.393,
    longitude: 127.128,
    max_depth: 3.0,
    avg_depth: 1.5,
    tag_names: ['커플', '산책'],
    post_count: 15,
    rating: 4.0,
    busy: true,
    opened: false,
  },
];

export default ValleyMockData;
