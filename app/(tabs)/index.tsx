import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Image, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import icons

const Page = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [workingDays, setWorkingDays] = useState('');
  const [showForm, setShowForm] = useState(true);
  const qrRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
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

  // Button press animation states for neumorphic buttons
  const [sharePressed, setSharePressed] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);
  const [newQRPressed, setNewQRPressed] = useState(false);

  const handleGenerateQR = async () => {
    if (!companyName || !workingDays) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsGenerating(true);

    try {
      if (!FileSystem.documentDirectory) {
        throw new Error('Document directory is not available');
      }
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      const existingCompanies = files.map(file => file.replace('.txt', '').toLowerCase());

      if (existingCompanies.includes(companyName.toLowerCase())) {
        Alert.alert('Error', `${companyName} is already registered!`);
        return;
      }

      const data = `Company: ${companyName}, Working Days: ${workingDays}`;
      setQrData(data);
      setShowForm(false);

      const filePath = `${FileSystem.documentDirectory}${companyName}.txt`;
      await FileSystem.writeAsStringAsync(filePath, data, { encoding: FileSystem.EncodingType.UTF8 });

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

      const uri = await captureRef(qrRef, { format: 'png', quality: 1 });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error sharing QR code:', error);
      Alert.alert('Error', 'Failed to share QR code');
    }
  };

  const handleNewQR = () => {
    setQrData(null);
    setCompanyName('');
    setWorkingDays('');
    setShowForm(true);
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
              style={styles.image}
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

            <Animated.View
              style={[
                styles.shadow,
                {
                  transform: [{ translateX: hoverAnim }, { translateY: hoverAnim }],
                },
              ]}
            />
            <TouchableOpacity 
              style={styles.button}  
              activeOpacity={5}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut} 
              onPress={handleGenerateQR}
            >
              <Text style={styles.buttonText}>Generate QR</Text>
            </TouchableOpacity>
          </>
        )}

        {qrData && (
          <View style={styles.qrContainer}>
            <View ref={qrRef} style={styles.qrCodeWrapper}>
              <QRCode value={qrData} size={200} color="black" backgroundColor="white" />
            </View>

            <View style={styles.buttonRow}>
              {/* Neumorphic Share Button with Icon */}
              <TouchableOpacity 
                style={[
                  styles.neumorphicButton,
                  sharePressed ? styles.neumorphicButtonPressed : {}
                ]}
                onPress={handleShareQR}
                onPressIn={() => setSharePressed(true)}
                onPressOut={() => setSharePressed(false)}
                activeOpacity={1}
              >
                <View style={styles.buttonContent}>
                  <FontAwesome name="share-alt" size={18} color="#2a1f62" style={styles.buttonIcon} />
                  <Text style={styles.neumorphicButtonText}>Share QR</Text>
                </View>
              </TouchableOpacity>

              {/* Neumorphic Delete Button with Icon */}
              <TouchableOpacity 
                style={[
                  styles.neumorphicButton, 
                  styles.deleteButton,
                  deletePressed ? styles.neumorphicButtonPressed : {}
                ]}
                onPress={handleNewQR}
                onPressIn={() => setDeletePressed(true)}
                onPressOut={() => setDeletePressed(false)}
                activeOpacity={1}
              >
                <View style={styles.buttonContent}>
                  <MaterialIcons name="delete-outline" size={20} color="#2a1f62" style={styles.buttonIcon} />
                  <Text style={styles.neumorphicButtonText}>Delete QR</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Neumorphic New QR Button with Icon */}
            <TouchableOpacity 
              style={[
                styles.neumorphicButton, 
                styles.newQRButton,
                newQRPressed ? styles.neumorphicButtonPressed : {}
              ]}
              onPress={handleNewQR}
              onPressIn={() => setNewQRPressed(true)}
              onPressOut={() => setNewQRPressed(false)}
              activeOpacity={1}
            >
              <View style={styles.buttonContent}>
                <MaterialIcons name="qr-code" size={20} color="#2a1f62" style={styles.buttonIcon} />
                <Text style={styles.neumorphicButtonText}>Generate New QR</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA', // Updated to match the parent background in the CSS
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  image: {
    position: 'relative',
    width: 300,
    height: 200,
    marginBottom: 10,
    top: -50,
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
  shadow: {
    position: 'relative',
    width: 150,
    height: 50,
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: 10,
    top: 10,
    left: 4,
  },
  button: {
    position: "relative",
    top: -40,
    backgroundColor: '#3575E4',
    borderColor: '#111',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 48,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  
  // Neumorphic button styles converted from CSS
  neumorphicButton: {
    alignItems: 'center',
    backgroundColor: '#f5f5fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    padding: 15,
    justifyContent: 'center',
    minWidth: 120,
    // Custom shadow implementation for the lighter inner shadow
    // Note: React Native can't do inset shadows, so we approximate
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  neumorphicButtonPressed: {
    backgroundColor: '#f0f0f5',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    transform: [{ scale: 0.98 }], // Slight scale down on press
  },
  neumorphicButtonText: {
    color: '#2a1f62',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'System',
  },
  deleteButton: {
    backgroundColor: '#fff0f0', // Slight reddish tint
  },
  newQRButton: {
    marginTop: 10,
    backgroundColor: '#f8f8ff',
    minWidth: 250,
  },
  // New styles for icon and text layout
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  }
});

export default Page;