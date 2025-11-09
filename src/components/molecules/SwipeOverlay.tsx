import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TinderText } from '../atoms/TinderText';
import { Colors } from '@/constants/colors';

interface SwipeOverlayProps {
  type: 'like' | 'nope';
  opacity: number;
}

export const SwipeOverlay: React.FC<SwipeOverlayProps> = ({ type, opacity }) => {
  const isLike = type === 'like';
  const textColor = isLike ? Colors.like : Colors.nope;
  
  return (
    <View
      style={[
        styles.overlay,
        {
          backgroundColor: isLike ? Colors.overlay.like : Colors.overlay.nope,
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.label,
          {
            borderColor: textColor,
            transform: [{ rotate: isLike ? '-20deg' : '20deg' }],
          },
        ]}
      >
        <TinderText style={{ ...styles.labelText, color: textColor }}>
          {isLike ? 'LIKE' : 'NOPE'}
        </TinderText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  label: {
    borderWidth: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  labelText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

