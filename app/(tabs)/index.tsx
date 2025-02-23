import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Page = () => {
  const handleGenerateQR = async () => {
    // try {
    //   const response = await fetch('https://your-backend-api.com/generate-qr', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ data: 'Your data here' }), // Replace with actual data
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to generate QR code');
    //   }

    //   const result = await response.json();
    //   Alert.alert('Success', 'QR code generated successfully!');
    //   console.log(result); // Handle the response data as needed
    // } catch (error) {
    //   Alert.alert('Error', 'Failed to generate QR code. Please try again.');
    //   console.error(error);
    // }
    alert("QR code generated successfully!");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
          <Text style={styles.buttonText}>Generate QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF', // Matches the navigation bar color
    borderWidth: 1,
    borderColor: '#007AFF', // Border color matches the background
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Page;