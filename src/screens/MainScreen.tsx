import { Colors } from '@/constants/colors';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDislikePerson, useLikePerson, useRecommendedPeople } from '../api/queries';
import { AppHeader } from '../components/molecules/AppHeader';
import { CardStack } from '../components/organisms/CardStack';

export const MainScreen: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useRecommendedPeople();
  const likeMutation = useLikePerson();
  const dislikeMutation = useDislikePerson();

  const allPeople = data?.pages.flatMap((page) => page.data) || [];

  const handleLike = async (personId: number) => {
    try {
      await likeMutation.mutateAsync(personId);
      console.log('Liked person:', personId);
    } catch (error) {
      console.error('Error liking person:', error);
    }
  };

  const handleDislike = async (personId: number) => {
    try {
      await dislikeMutation.mutateAsync(personId);
      console.log('Disliked person:', personId);
    } catch (error) {
      console.error('Error disliking person:', error);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <CardStack
        people={allPeople}
        onLike={handleLike}
        onDislike={handleDislike}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        hasMore={hasNextPage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

