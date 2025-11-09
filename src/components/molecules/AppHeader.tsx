import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { TinderText } from '../atoms/TinderText';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface AppHeaderProps {
  title?: string;
  showProfileIcon?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  title = 'Tinder', 
  showProfileIcon = true 
}) => {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push('/profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require('../../../assets/images/app-icon.png')}
          style={styles.appIcon}
          resizeMode="contain"
        />
        <TinderText style={styles.title}>{title}</TinderText>
      </View>

      {showProfileIcon && (
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color={Colors.text.dark} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    zIndex: 100,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  profileButton: {
    padding: 4,
  },
});

