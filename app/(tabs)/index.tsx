import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Link href={"/QrGenerator"} asChild>
          <TouchableOpacity>
            <Text>Generate QR</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default Page