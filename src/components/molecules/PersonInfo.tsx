import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TinderText } from '../atoms/TinderText';
import { Ionicons } from '@expo/vector-icons';

interface PersonInfoProps {
  name: string;
  age: number;
  location: string;
}

export const PersonInfo: React.FC<PersonInfoProps> = ({ name, age, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameRow}>
        <TinderText type="title">
          {name}, {age}
        </TinderText>
      </View>
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={18} color="#FFF" />
        <TinderText type="body" style={styles.location}>
          {location}
        </TinderText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 16,
  },
});

