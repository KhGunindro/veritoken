import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import BarCodeScanner from 'expo-barcode-scanner'

const Page = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned!');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })

    // request camera permission
    useEffect(() => {
      askForCameraPermission();
    }, []);

    // what happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
      setScanned(true);
      setText(data);
      console.log('Type: ' + type + '');
      
    }

    // check for permission and return the screen
    if (hasPermission === null) {
      return(
        <View>
          <Text>Requesting for camera permission</Text>
        </View>
      )
    }
  }
  return (
    <View>
      <Text>Qr Scanner</Text>
    </View>
  )
}

export default Page