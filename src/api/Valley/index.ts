import basicClient from '../Auth/basicClient';
import { ValleyDetailReviewResponseType, ValleysType } from '../../types';
import { logout } from '../Auth/AuthService';

export const fetchValleys = async (
  latitude: number,
  longitude: number,
  radius: number,
): Promise<ValleysType[]> => {
  try {
    const response = await basicClient.get(
      `/api/valley?position=${longitude},${latitude}&radius=${radius}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    logout();
    window.location.href = '/errorpage';
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
    logout();
    window.location.href = '/errorpage';
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
    throw new Error('Failed to fetch ValleyDetailImage');
  }
};
