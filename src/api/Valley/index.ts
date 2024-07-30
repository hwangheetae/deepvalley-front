import basicClient from '../Auth/basicClient';
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

export const fetchValleyDetail = async (valleyId: string) => {
  try {
    const response = await basicClient.get(`/api/valley/${valleyId}/detail`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch ValleyDetail');
  }
};
