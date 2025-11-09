import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';
import { DislikeResponse, LikeResponse, PaginatedResponse, Person } from './types';


const USER_ID = parseInt(process.env.EXPO_PUBLIC_USER_ID || '1', 10);


if (!process.env.EXPO_PUBLIC_USER_ID) {
  console.warn('⚠️  EXPO_PUBLIC_USER_ID not set in .env file. Using default user ID: 1');
}
export const useRecommendedPeople = () => {
  return useInfiniteQuery({
    queryKey: ['recommended', USER_ID],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await apiClient.get<PaginatedResponse<Person>>(
        `/people/recommended?page=${pageParam}&per_page=10&user_id=${USER_ID}`
      );
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useLikePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (personId: number) => {
      const { data } = await apiClient.post<LikeResponse>(`/people/${personId}/like`, {
        user_id: USER_ID,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liked'] });
    },
  });
};

export const useDislikePerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (personId: number) => {
      const { data } = await apiClient.post<DislikeResponse>(`/people/${personId}/dislike`, {
        user_id: USER_ID,
      });
      return data;
    },
  });
};

export const useLikedPeople = () => {
  return useQuery({
    queryKey: ['liked', USER_ID],
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: Person[] }>(
        `/people/liked?user_id=${USER_ID}`
      );
      return data.data;
    },
  });
};

