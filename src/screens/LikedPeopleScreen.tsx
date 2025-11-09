import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useLikedPeople } from '../api/queries';
import { TinderText } from '../components/atoms/TinderText';
import { AppHeader } from '../components/molecules/AppHeader';
import { Person } from '../api/types';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

export const LikedPeopleScreen: React.FC = () => {
  const { data: likedPeople, isLoading } = useLikedPeople();

  const renderCard = ({ item }: { item: Person }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.pictures[0] }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardInfo}>
        <TinderText type="subtitle" style={styles.name}>
          {item.name}, {item.age}
        </TinderText>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <TinderText style={styles.location}>{item.location}</TinderText>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader title="Liked by You" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!likedPeople || likedPeople.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader title="Liked by You" />
        <View style={styles.centerContainer}>
          <TinderText style={styles.emptyText}>No liked people yet</TinderText>
          <TinderText style={styles.emptySubText}>
            Start swiping to find your matches!
          </TinderText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Liked by You" />
      <FlatList
        data={likedPeople}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '75%',
  },
  cardInfo: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: Colors.text.dark,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  location: {
    fontSize: 12,
    color: Colors.text.light,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.text.light,
    marginTop: 8,
  },
});

