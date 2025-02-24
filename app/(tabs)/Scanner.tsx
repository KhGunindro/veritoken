import { View, Text, Pressable, StyleSheet, Image, StatusBar } from 'react-native'
import React from 'react'
import { useCameraPermissions } from 'expo-camera'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  const handlePress = async () => {
    // Check if permission is already granted
    if (permission?.granted) {
      router.push('/scanner');
      return;
    }
    // Request permission if not granted
    const permissionResponse = await requestPermission();
    if (permissionResponse.granted) {
      router.push('/scanner');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.heroContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="qr-code" size={80} color="#4F46E5" />
        </View>
        <Text style={styles.title}>QR Scanner</Text>
        <Text style={styles.subtitle}>Scan QR to verify your token</Text>
      </View>
      
      <Pressable 
        style={({pressed}) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
        onPress={handlePress}
      >
        <Ionicons name="scan-outline" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Open Scanner</Text>
      </Pressable>
      
      <Text style={styles.privacyText}>
        Camera access is required for scanning QR codes
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: '80%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    maxWidth: 280,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonPressed: {
    backgroundColor: '#3730A3',
    transform: [{ scale: 0.98 }],
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  privacyText: {
    marginTop: 24,
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  }
})

export default Page