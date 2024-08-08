import basicClient from '../Auth/basicClient';

export const submitSuggest = async (formData: FormData) => {
  return basicClient.post('api/suggest', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
