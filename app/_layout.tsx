import React from 'react'
import { Stack } from 'expo-router'
import { Image } from 'react-native'

const Layout = () => {
  return (
    <Stack screenOptions={{headerShadowVisible: true}}>
        <Stack.Screen name="(tabs)" options={{
            headerTitle: 'Veritoken',
            headerStyle: { backgroundColor: '#4177ca' },
            headerTitleStyle: { fontFamily: 'Sans Serif', fontSize: 20, color: 'white' },
            headerRight: () => (
                <Image
                    source={require('../assets/images/logo.png')}
                    style={{ width: 50, height: 45 }}
                />
            ),
        }} />
        <Stack.Screen name='QrGenerator' options={{headerTitle: 'QR code generator'}}/>
    </Stack>
  )
}

export default Layout