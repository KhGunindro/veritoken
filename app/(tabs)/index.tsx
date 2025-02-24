import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';

const Page = () => {

const [qrData, setQrData] = useState<string | null>(null);
const [companyName, setCompanyName] = useState('');
const [workingDays, setWorkingDays] = useState('');
const [showForm, setShowForm] = useState(true);


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
        <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
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
  button: {
    backgroundColor: '#007AFF',
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
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
