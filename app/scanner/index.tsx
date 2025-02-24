import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { CameraView } from 'expo-camera'
import Overlay from './Overlay'
import { useNavigation } from '@react-navigation/native'

const Page = () => {
  const navigation = useNavigation();
  
  // Set the header title to "QR Scanner"
  useEffect(() => {
    navigation.setOptions({
      title: 'QR Scanner',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <CameraView 
        style={styles.camera}
        facing='back'
        onBarcodeScanned={({data}) => console.log("data ", data)}
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