import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Image, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const Page = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [workingDays, setWorkingDays] = useState('');
  const [showForm, setShowForm] = useState(true);
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

  const handleGenerateQR = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [workingDays, setWorkingDays] = useState('');
  const [showForm, setShowForm] = useState(true);
  const qrRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNewQR = () => {
    setQrData(null);
    setCompanyName('');
    setWorkingDays('');
    setShowForm(true);
  };



  // change the database to a Cybrella's database
  const handleGenerateQR = async () => {
    if (!companyName || !workingDays) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Check for existing company names
      if (!FileSystem.documentDirectory) {
        throw new Error('Document directory is not available');
      }
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      const existingCompanies = files.map(file => 
        file.replace('.txt', '').toLowerCase()
      );

      if (existingCompanies.includes(companyName.toLowerCase())) {
        Alert.alert('Error', `${companyName} is already registered!`);
        return;
      }

      const data = `Company: ${companyName}, Working Days: ${workingDays}`;
      setQrData(data);
      setShowForm(false);

      const filePath = `${FileSystem.documentDirectory}${companyName}.txt`;
      await FileSystem.writeAsStringAsync(filePath, data, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      Alert.alert("QR generated successfully!");
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "Failed to generate QR code");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareQR = async () => {
    try {
      if (!qrRef.current) {
        Alert.alert('Error', 'Generate a QR code first');
        return;
      }

      const uri = await captureRef(qrRef, {
        format: 'png',
        quality: 1,
      });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error sharing QR code:', error);
      Alert.alert('Error', 'Failed to share QR code');
    }
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.content}>
      {isGenerating && (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Generating your QR code...</Text>
    </View>
  )}
        {showForm && (
          <>
            <Image
              source={require('../../assets/images/scanner.png')}
              style={{ width: 300,
                height: 200,
                position: 'relative',
                top: -60,
                marginBottom: 10, 
                 }}
            />
            <TextInput
              placeholder="Company Name"
              value={companyName}
              onChangeText={setCompanyName}
              style={styles.input}
            />
            <TextInput
              placeholder="Working Days"
              value={workingDays}
              onChangeText={setWorkingDays}
              style={styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
              <Text style={styles.buttonText}>Generate QR</Text>
            </TouchableOpacity>
          </>
        )}
        <Animated.View style={[styles.shadow, { transform: [{ translateX: hoverAnim }, { translateY: hoverAnim }] }]} />
        <TouchableOpacity style={styles.button}  activeOpacity={30} // Mimics :active effect
        onPressIn={handlePressIn}
        onPressOut={handlePressOut} 
        onPress={handleGenerateQR}>
          <Text style={styles.buttonText}>Generate QR</Text>
        </TouchableOpacity>

        {qrData && (
          <View style={styles.qrContainer}>
            <View ref={qrRef} style={styles.qrCodeWrapper}>
              <QRCode
                value={qrData}
                size={200}
                color="black"
                backgroundColor="white"
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.shareButton} onPress={handleShareQR}>
                <Text style={styles.buttonText}>Share QR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleNewQR}>
                <Text style={styles.buttonText}>Delete QR</Text>
              </TouchableOpacity>
            </View>
            {/* Added Generate New QR button */}
            <TouchableOpacity style={styles.newQRButton} onPress={handleNewQR}>
              <Text style={styles.buttonText}>Generate New QR</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  shadow: {
    position: 'relative',
    width: 160, // Adjust as needed
    height: 48,
    backgroundColor: '#111', // Matches CSS shadow
    borderRadius: 8,
    top: -1,
    zIndex: -1, // Places it behind the button
  },
  button: {
    position:'relative',
    top:-50,
    width: 160,
    height: 48,
    backgroundColor: '#3575E4',
    borderColor: '#111',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007AFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    maxWidth: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrCodeWrapper: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  shareButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  newQRButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Page;