import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TinderButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  backgroundColor: string;
  iconColor?: string;
  size?: number;
  style?: ViewStyle;
}

export const TinderButton: React.FC<TinderButtonProps> = ({
  icon,
  onPress,
  backgroundColor,
  iconColor = '#FFF',
  size = 60,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, width: size, height: size, borderRadius: size / 2 }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={size * 0.5} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

