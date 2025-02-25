import { View, Text, Pressable, StyleSheet, StatusBar, Animated } from 'react-native';
import React, { useState } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();
  const [hoverAnim] = useState(new Animated.Value(8));

  const handlePressIn = () => {
    Animated.timing(hoverAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(hoverAnim, {
      toValue: 8,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlePress = async () => {
    if (isScanning) return;
    setIsScanning(true);

    if (permission?.granted) {
      router.push({
        pathname: '/scanner',
        params: { singleScan: 'true' }
      });
      return;
    }

    const permissionResponse = await requestPermission();
    if (permissionResponse.granted) {
      router.push({
        pathname: '/scanner',
        params: { singleScan: 'true' }
      });
    } else {
      setIsScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.heroContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="qr-code" size={80} color="#3575E4" />
        </View>
        <Text style={styles.title}>QR Scanner</Text>
        <Text style={styles.subtitle}>Scan QR to verify your token</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Animated.View
          style={[
            styles.shadow,
            {
              transform: [{ translateX: hoverAnim }, { translateY: hoverAnim }],
            },
          ]}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            isScanning && styles.buttonDisabled,
          ]}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isScanning}
        >
          <Ionicons name="scan-outline" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>
            {isScanning ? "Scanning..." : "Open Scanner"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.privacyText}>
        Camera access is required for scanning QR codes
      </Text>
    </View>
  );
};

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
  buttonWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  shadow: {
    position: 'absolute',
    width: 280,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    top: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3575E4',
    borderColor: '#111',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: 280,
    elevation: 4,
  },
  buttonPressed: {
    backgroundColor: '#3730A3',
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    borderColor: '#9CA3AF',
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
  },
});

export default Page;