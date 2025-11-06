import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigation/index';
import {colors, spacing, typography, borderRadius} from '@/theme';
import Icon from 'react-native-vector-icons/Feather';
import {Camera, useCameraDevices} from 'react-native-camera';

type CameraScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Camera'>;
};

export default function CameraScreen({navigation}: CameraScreenProps) {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const [isFlashOn, setIsFlashOn] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  const takePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({
          flash: isFlashOn ? 'on' : 'off',
          qualityPrioritization: 'quality',
        });

        setCapturedPhotos([...capturedPhotos, photo.path]);
        Alert.alert('Success', 'Photo captured!');
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo');
      }
    }
  };

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

  const handleDone = () => {
    if (capturedPhotos.length > 0) {
      navigation.navigate('Review', {fileId: '123'});
    } else {
      navigation.goBack();
    }
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No camera device available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={colors.neutral.white} />
        </TouchableOpacity>

        <View style={styles.photoCounter}>
          <Icon name="image" size={20} color={colors.neutral.white} />
          <Text style={styles.photoCounterText}>{capturedPhotos.length}</Text>
        </View>

        <TouchableOpacity style={styles.topButton} onPress={toggleFlash}>
          <Icon
            name={isFlashOn ? 'zap' : 'zap-off'}
            size={24}
            color={isFlashOn ? colors.accent.yellow : colors.neutral.white}
          />
        </TouchableOpacity>
      </View>

      {/* Guide Overlay */}
      <View style={styles.guideOverlay}>
        <View style={styles.guideFrame} />
        <Text style={styles.guideText}>
          Position diagram within frame
        </Text>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePhoto}
            activeOpacity={0.8}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>

        {capturedPhotos.length > 0 && (
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            activeOpacity={0.8}>
            <Icon name="check" size={24} color={colors.neutral.white} />
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tips */}
      <View style={styles.tips}>
        <View style={styles.tip}>
          <Icon name="sun" size={16} color={colors.neutral.white} />
          <Text style={styles.tipText}>Ensure good lighting</Text>
        </View>
        <View style={styles.tip}>
          <Icon name="maximize" size={16} color={colors.neutral.white} />
          <Text style={styles.tipText}>Keep diagram flat</Text>
        </View>
        <View style={styles.tip}>
          <Icon name="target" size={16} color={colors.neutral.white} />
          <Text style={styles.tipText}>Focus on details</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorText: {
    color: colors.neutral.white,
    fontSize: typography.sizes.lg,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  photoCounterText: {
    color: colors.neutral.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
  guideOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  guideFrame: {
    width: '90%',
    aspectRatio: 4 / 3,
    borderWidth: 3,
    borderColor: colors.accent.green,
    borderRadius: borderRadius.lg,
    borderStyle: 'dashed',
  },
  guideText: {
    color: colors.neutral.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    marginTop: spacing.lg,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  captureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.neutral.white,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent.green,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
  },
  doneButtonText: {
    color: colors.neutral.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  tips: {
    position: 'absolute',
    bottom: 180,
    left: spacing.xl,
    right: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tip: {
    alignItems: 'center',
    gap: 4,
  },
  tipText: {
    color: colors.neutral.white,
    fontSize: typography.sizes.xs,
    textAlign: 'center',
  },
});
