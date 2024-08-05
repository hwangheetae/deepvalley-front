import basicClient from '../../api/Auth/basicClient';
import { ValleysType } from '../../types';

export const fetchfacilities = async (latitude: number, longitude: number) => {
  try {
    const response = await basicClient.get(
      `/api/valley?position=${longitude}, ${latitude}&radius=1000000`, //radius 임시
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch facility');
  }
};

export const fetchValleys = async (): Promise<ValleysType[]> => {
  try {
    const response = await basicClient.get('/api/valley', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch valleys');
  }
};

export const fetchValleysByKeyword = async (
  keyword: string,
): Promise<ValleysType[]> => {
  try {
    const response = await basicClient.get(`/api/valley?keyword=${keyword}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch valleys by keyword');
  }
};

export const fetchValleysByFilter = async (
  filters: any,
): Promise<ValleysType[]> => {
  const { position, radius, tag_names, rating, offset, region } = filters;

  let queryParams = '';
  if (position) queryParams += `position=${position}&`;
  if (radius) queryParams += `radius=${radius}&`;
  if (tag_names) queryParams += `tag_names=${tag_names.join(',')}&`;
  if (rating) queryParams += `rating=${rating}&`;
  if (offset) queryParams += `offset=${offset}&`;
  if (region) queryParams += `region=${region}&`;

  try {
    const response = await basicClient.get(`/api/valley?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch valleys by filter');
  }
};

export const fetchRegions = async (): Promise<string[]> => {
  try {
    const response = await basicClient.get('/api/region', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.regions;
  } catch (error) {
    throw new Error('Failed to fetch regions');
  }
};
