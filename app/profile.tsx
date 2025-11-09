import { Colors } from '@/constants/colors';
import { useLikedPeople } from '@/src/api/queries';
import { TinderText } from '@/src/components/atoms/TinderText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { data: likedPeople, isLoading } = useLikedPeople();

  const likesGiven = likedPeople?.length || 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={Colors.text.dark} />
        </TouchableOpacity>
        <TinderText style={styles.headerTitle}>Profile</TinderText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../assets/images/profile-pic.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        <TinderText style={styles.name}>Test User</TinderText>
        <TinderText style={styles.email}>test@example.com</TinderText>
        <View style={styles.quoteContainer}>
          <Ionicons name="heart" size={24} color={Colors.primary} style={styles.quoteIcon} />
          <TinderText style={styles.quote}>
            "Finding connections one swipe at a time! ✨"
          </TinderText>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <>
                <TinderText style={styles.statNumber}>{likesGiven}</TinderText>
                <TinderText style={styles.statLabel}>Likes Given</TinderText>
              </>
            )}
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons name="heart" size={16} color={Colors.primary} />
          <TinderText style={styles.footerText}>
            Developed with love by <TinderText style={styles.footerName}>Muskan</TinderText>
          </TinderText>
          <Ionicons name="heart" size={16} color={Colors.primary} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  placeholder: {
    width: 36,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: Colors.text.light,
    marginBottom: 30,
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F7',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginBottom: 30,
    maxWidth: '100%',
  },
  quoteIcon: {
    marginRight: 12,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.text.dark,
    flex: 1,
    lineHeight: 24,
  },
  statsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: Colors.text.light,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.text.light,
  },
  footerName: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

