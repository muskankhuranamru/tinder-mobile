import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SwipeToastProps {
  type: 'like' | 'nope';
  visible: boolean;
  onAnimationComplete?: () => void;
}

export const SwipeToast: React.FC<SwipeToastProps> = ({ type, visible, onAnimationComplete }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current; // Start from below
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (visible) {
      // Reset animations
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
      translateYAnim.setValue(30);

      // Play lottie animation
      lottieRef.current?.play();

      // Animate in - pop up from bottom
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 80,
          friction: 8,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Animate out after delay
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: -20,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onAnimationComplete?.();
        });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [visible, scaleAnim, opacityAnim, translateYAnim, onAnimationComplete]);

  if (!visible) return null;

  const lottieSource = type === 'like' 
    ? require('../../../assets/lottie/like.json')
    : require('../../../assets/lottie/nope.json');

  const positionStyle = {
    bottom: 120,
    left: SCREEN_WIDTH / 2 - 40, 
  };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        {
          opacity: opacityAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: translateYAnim },
          ],
        },
      ]}
      pointerEvents="none"
    >
      <LottieView
        ref={lottieRef}
        source={lottieSource}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000, 
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

