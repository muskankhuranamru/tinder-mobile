import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';

interface TinderTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  type?: 'title' | 'subtitle' | 'body' | 'caption';
}

export const TinderText: React.FC<TinderTextProps> = ({ children, style, type = 'body' }) => {
  return <Text style={[styles.base, styles[type], style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  base: {
    color: '#424242',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  body: {
    fontSize: 16,
    color: '#FFF',
  },
  caption: {
    fontSize: 14,
    color: '#FFF',
  },
});

