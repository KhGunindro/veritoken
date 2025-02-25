import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Image, Animated } from 'react-native';
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';

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
    if (!companyName || !workingDays) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const data = `Company: ${companyName}, Working Days: ${workingDays}`;
    setQrData(data);
    setShowForm(false);
    Alert.alert('Success', 'QR code generated successfully!');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
            <QRCode
              value={qrData}
              size={200}
              color="black"
              backgroundColor="white"
            />
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
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  qrContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Page;
