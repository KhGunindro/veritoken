import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const QRScanOverlay = ({
  scannerSize = 250,
  borderColor = '#FFF',
  overlayColor = 'rgba(0, 0, 0, 0.4)' // Reduced opacity from 0.7 to 0.5
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: scannerSize,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        })
      ]).start(animate);
    };

    animate();
    return () => animatedValue.stopAnimation();
  }, [scannerSize]);

  const cornerSize = 20;
  const cornerWidth = 2;

  return (
    <View style={styles.container}>
      {/* Overlay */}
      <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
      
      {/* Scanner Window */}
      <View style={[styles.scannerWindow, { 
        width: scannerSize, 
        height: scannerSize,
      }]}>
        {/* Corners */}
        {/* Top Left */}
        <View style={[styles.corner, styles.topLeft]}>
          <View style={[styles.cornerBorder, { width: cornerSize, height: cornerWidth, backgroundColor: borderColor }]} />
          <View style={[styles.cornerBorder, { width: cornerWidth, height: cornerSize, backgroundColor: borderColor }]} />
        </View>

        {/* Top Right */}
        <View style={[styles.corner, styles.topRight]}>
          <View style={[styles.cornerBorder, { width: cornerSize, height: cornerWidth, backgroundColor: borderColor }]} />
          <View style={[styles.cornerBorder, { width: cornerWidth, height: cornerSize, backgroundColor: borderColor }]} />
        </View>

        {/* Bottom Left */}
        <View style={[styles.corner, styles.bottomLeft]}>
          <View style={[styles.cornerBorder, { width: cornerSize, height: cornerWidth, backgroundColor: borderColor }]} />
          <View style={[styles.cornerBorder, { width: cornerWidth, height: cornerSize, backgroundColor: borderColor }]} />
        </View>

        {/* Bottom Right */}
        <View style={[styles.corner, styles.bottomRight]}>
          <View style={[styles.cornerBorder, { width: cornerSize, height: cornerWidth, backgroundColor: borderColor }]} />
          <View style={[styles.cornerBorder, { width: cornerWidth, height: cornerSize, backgroundColor: borderColor }]} />
        </View>

        {/* Scanning Line */}
        <Animated.View 
          style={[
            styles.scanLine,
            {
              backgroundColor: borderColor,
              transform: [{ translateY: animatedValue }]
            }
          ]} 
        />
      </View>

      {/* Guide Text */}
      <Text style={[styles.guideText, { top: (SCREEN_HEIGHT - scannerSize) / 2 + scannerSize + 40 }]}>
        Position QR code within the frame
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  scannerWindow: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  cornerBorder: {
    position: 'absolute',
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    transform: [{ rotate: '90deg' }],
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    transform: [{ rotate: '-90deg' }],
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    transform: [{ rotate: '180deg' }],
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#FFF',
  },
  guideText: {
    position: 'absolute',
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default QRScanOverlay;