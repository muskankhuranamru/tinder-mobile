import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Person } from '../../api/types';
import { PersonInfo } from '../molecules/PersonInfo';
import { SwipeOverlay } from '../molecules/SwipeOverlay';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.65; // Reduced from 0.7 to 0.65 to avoid header overlap
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface PersonCardProps {
  person: Person;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeComplete: () => void;
  index: number;
  totalCards: number;
  isActive: boolean;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  person,
  onSwipeLeft,
  onSwipeRight,
  onSwipeComplete,
  index,
  totalCards,
  isActive,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(isActive)
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      const shouldSwipeRight = translateX.value > SWIPE_THRESHOLD;
      const shouldSwipeLeft = translateX.value < -SWIPE_THRESHOLD;

      if (shouldSwipeRight) {
        translateX.value = withSpring(SCREEN_WIDTH * 1.5, {}, (finished) => {
          if (finished) {
            runOnJS(onSwipeRight)();
            runOnJS(onSwipeComplete)();
          }
        });
      } else if (shouldSwipeLeft) {
        translateX.value = withSpring(-SCREEN_WIDTH * 1.5, {}, (finished) => {
          if (finished) {
            runOnJS(onSwipeLeft)();
            runOnJS(onSwipeComplete)();
          }
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-15, 0, 15]
    );

    const scale = interpolate(index, [0, 1, 2], [1, 0.95, 0.9]);

    const offsetY = index * -10;

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: isActive ? translateY.value : offsetY },
        { rotate: `${rotate}deg` },
        { scale },
      ],
      zIndex: totalCards - index,
    };
  });

  const likeOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1]
    );

    return {
      opacity: opacity > 0 ? opacity : 0,
    };
  });

  const nopeOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0]
    );

    return {
      opacity: opacity > 0 ? opacity : 0,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image
          source={{ uri: person.pictures[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.gradient}>
          <PersonInfo name={person.name} age={person.age} location={person.location} />
        </View>
        {isActive && (
          <>
            <Animated.View style={[styles.overlayContainer, likeOverlayStyle]}>
              <SwipeOverlay type="like" opacity={1} />
            </Animated.View>
            <Animated.View style={[styles.overlayContainer, nopeOverlayStyle]}>
              <SwipeOverlay type="nope" opacity={1} />
            </Animated.View>
          </>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

