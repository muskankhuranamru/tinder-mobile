import { Colors } from '@/constants/colors';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Person } from '../../api/types';
import { SwipeToast } from '../atoms/SwipeToast';
import { TinderButton } from '../atoms/TinderButton';
import { TinderText } from '../atoms/TinderText';
import { PersonCard } from './PersonCard';

interface CardStackProps {
  people: Person[];
  onLike: (personId: number) => void;
  onDislike: (personId: number) => void;
  onLoadMore: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

export const CardStack: React.FC<CardStackProps> = ({
  people,
  onLike,
  onDislike,
  onLoadMore,
  isLoading,
  hasMore,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'like' | 'nope'>('like');


  const visibleCards = people.slice(currentIndex, currentIndex + 3);
  const currentPerson = people[currentIndex];

  useEffect(() => {
    if (hasMore && !isLoading && people.length - currentIndex < 5) {
      onLoadMore();
    }
  }, [currentIndex, people.length, hasMore, isLoading, onLoadMore]);

  const handleSwipeRight = () => {
    if (isAnimating || !currentPerson) return;
    setIsAnimating(true);
    setToastType('like');
    setShowToast(true);
    onLike(currentPerson.id);
  };

  const handleSwipeLeft = () => {
    if (isAnimating || !currentPerson) return;
    setIsAnimating(true);
    setToastType('nope');
    setShowToast(true);
    onDislike(currentPerson.id);
  };

  const handleSwipeComplete = () => {
    setCurrentIndex((prev) => prev + 1);
    setIsAnimating(false);
  };

  const handleToastComplete = () => {
    setShowToast(false);
  };

  if (people.length === 0 && isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <TinderText style={styles.loadingText}>Loading profiles...</TinderText>
      </View>
    );
  }

  if (currentIndex >= people.length) {
    return (
      <View style={styles.centerContainer}>
        <TinderText style={styles.noMoreText}>No more profiles</TinderText>
        <TinderText style={styles.subText}>Check back later for more!</TinderText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {visibleCards.map((person, idx) => (
          <PersonCard
            key={`card-${currentIndex}-${idx}`}
            person={person}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onSwipeComplete={handleSwipeComplete}
            index={idx}
            totalCards={visibleCards.length}
            isActive={idx === 0}
          />
        ))}
      </View>
      <SwipeToast 
        type={toastType} 
        visible={showToast} 
        onAnimationComplete={handleToastComplete}
      />

      <View style={styles.buttonsContainer}>
        <TinderButton
          icon="close"
          onPress={() => {
            if (!isAnimating && currentPerson) {
              handleSwipeLeft();
              setTimeout(() => handleSwipeComplete(), 300);
            }
          }}
          backgroundColor={Colors.nope}
          size={70}
        />
        <TinderButton
          icon="heart"
          onPress={() => {
            if (!isAnimating && currentPerson) {
              handleSwipeRight();
              setTimeout(() => handleSwipeComplete(), 300);
            }
          }}
          backgroundColor={Colors.like}
          size={70}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    paddingBottom: 40,
    gap: 40,
    zIndex: 10,
    position: 'relative',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: Colors.text.dark,
  },
  noMoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  subText: {
    fontSize: 16,
    color: Colors.text.light,
    marginTop: 10,
  },
});

