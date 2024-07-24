import basicClient from '../../api/Auth/basicClient';
import { ValleysType } from '../../types';

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
