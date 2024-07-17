export const fetchReviews = async (memberId: string) => {
  const response = await fetch(`/api/member/${memberId}/review`);
  if (!response.ok) {
    throw new Error('Error Fetch ReviewsApi');
  }
  return response.json();
};
