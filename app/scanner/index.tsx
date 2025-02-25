import { SafeAreaView, StyleSheet, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CameraView } from 'expo-camera'
import Overlay from './Overlay'
import { useNavigation } from '@react-navigation/native'
import * as FileSystem from 'expo-file-system'

const Page = () => {
  const navigation = useNavigation();
  const [scannedData, setScannedData] = useState<string | null>(null); // Store scanned QR data
  const [hasScanned, setHasScanned] = useState(false); // Prevent multiple scans

  // Set the header title to "QR Scanner"
  useEffect(() => {
    navigation.setOptions({
      title: 'QR Scanner',
    });
  }, [navigation]);

  const handleBackPress = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  const checkCredentials = async (scannedData: string) => {
    try {
      const directory = FileSystem.documentDirectory;
      if (!directory) {
        throw new Error('Document directory is null');
      }
  
      // Get list of files in the document directory
      const files = await FileSystem.readDirectoryAsync(directory);
      const parsedData = JSON.parse(scannedData); // Parse the JSON
      const companyName = parsedData.CompanyName; // Extract CompanyName
      
      for (const fileName of files) {
        if (fileName === `${companyName}.txt`) {  // Correct comparison
          Alert.alert('Verified', `Welcome to Cybrella ${companyName}!`);
          return true;
        }
      }
      
  
      Alert.alert('No Match', 'Scanned QR code does not match any stored data.');
      return false;
    } catch (error) {
      console.error('Error reading files:', error);
      Alert.alert('Not verified!', 'Please register the company first.');
      return false;
    }
  };

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (!hasScanned) {
      setScannedData(data); // Store scanned data
      setHasScanned(true);  // Prevent further scanning
      await checkCredentials(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing='back'
        onBarcodeScanned={handleBarcodeScanned}
      />
      <View style={styles.overlayContainer}>
        <Overlay />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    // This ensures the overlay is positioned on top of the camera
    zIndex: 1,
  }
});

export default Page
