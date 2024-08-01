import basicClient from '../Auth/basicClient';
import { ValleyDetailReviewResponseType, ValleysType } from '../../types';

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

export const fetchValleyDetailInfo = async (valleyId: string) => {
  try {
    const response = await basicClient.get(`/api/valley/${valleyId}/detail`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch ValleyDetailinfo');
  }
};

export const fetchValleyDetailReview = async (
  valleyId: string,
): Promise<ValleyDetailReviewResponseType> => {
  try {
    const response = await basicClient.get(`/api/valley/${valleyId}/review`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch ValleyDetailReview');
  }
};

export const fetchValleyDetailImage = async (valleyId: string) => {
  try {
    const response = await basicClient.get(`/api/valley/${valleyId}/image`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch ValleyDetailimage');
  }
};
