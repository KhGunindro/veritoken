import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { Image, View, Modal, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Layout = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const HelpModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>How to Use Veritoken</Text>
          <Text style={styles.modalText}>
            1. Generate QR codes for your tokens{'\n'}
            2. Scan tokens to verify authenticity{'\n'}
            3. Manage your token inventory{'\n'}
            4. Track token usage statistics
          </Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <Stack screenOptions={{ headerShadowVisible: true }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerStyle: { backgroundColor: '#4177ca' },
            headerTitleStyle: { 
              fontFamily: 'Sans Serif', 
              fontSize: 20, 
              color: 'white' 
            },
            headerTitle: () => <Text style={{ color: 'white', fontSize: 20, paddingLeft:10 }}>Veritoken</Text>,
            headerLeft: () => (
              <Image
                source={require('../assets/images/logo.png')}
                style={{ width: 50, height: 45 }}
              />
            ),
            headerRight: () => (
              <Pressable
                onPress={() => setModalVisible(true)}
                hitSlop={60}
                style={{ paddingRight: 15 }}
              >
                <FontAwesome name="question-circle" size={34} color="white" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="QrGenerator"
          options={{ headerTitle: 'QR code generator' }}
        />
      </Stack>
      <HelpModal />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#4177ca',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 100,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Layout;