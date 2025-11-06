import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigation/index';
import {colors, spacing, typography, borderRadius, shadows} from '@/theme';
import Icon from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

type QuoteScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

export default function QuoteScreen({navigation}: QuoteScreenProps) {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleDocumentPick = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          'application/dxf',
          'application/dwg',
        ],
        allowMultiSelection: true,
      });

      setUploadedFiles([...uploadedFiles, ...results]);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Failed to pick document');
      }
    }
  };

  const handleCamera = () => {
    navigation.navigate('Camera');
  };

  const handleImageLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 10,
    });

    if (result.assets) {
      setUploadedFiles([...uploadedFiles, ...result.assets]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (uploadedFiles.length > 0) {
      navigation.navigate('Review', {fileId: '123'});
    } else {
      Alert.alert('No Files', 'Please upload at least one file');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutral.white} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Get Instant Quote</Text>
        <Text style={styles.subtitle}>
          Upload your harness diagram or take a photo to begin
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upload Options */}
        <View style={styles.uploadOptions}>
          <TouchableOpacity
            style={styles.uploadOption}
            onPress={handleCamera}
            activeOpacity={0.7}>
            <View style={[styles.optionIcon, {backgroundColor: `${colors.accent.green}15`}]}>
              <Icon name="camera" size={32} color={colors.accent.green} />
            </View>
            <Text style={styles.optionTitle}>Take Photo</Text>
            <Text style={styles.optionDescription}>
              Use camera to capture diagram
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadOption}
            onPress={handleImageLibrary}
            activeOpacity={0.7}>
            <View style={[styles.optionIcon, {backgroundColor: `${colors.accent.blue}15`}]}>
              <Icon name="image" size={32} color={colors.accent.blue} />
            </View>
            <Text style={styles.optionTitle}>Photo Library</Text>
            <Text style={styles.optionDescription}>
              Choose from gallery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadOption}
            onPress={handleDocumentPick}
            activeOpacity={0.7}>
            <View style={[styles.optionIcon, {backgroundColor: `${colors.accent.yellow}15`}]}>
              <Icon name="file-text" size={32} color={colors.accent.yellow} />
            </View>
            <Text style={styles.optionTitle}>Browse Files</Text>
            <Text style={styles.optionDescription}>
              PDF, CAD, Excel files
            </Text>
          </TouchableOpacity>
        </View>

        {/* Supported Formats */}
        <View style={styles.formatsCard}>
          <Text style={styles.formatsTitle}>Supported Formats</Text>
          <View style={styles.formatsList}>
            <View style={styles.formatItem}>
              <Icon name="check" size={16} color={colors.accent.green} />
              <Text style={styles.formatText}>CAD Files (.dxf, .dwg)</Text>
            </View>
            <View style={styles.formatItem}>
              <Icon name="check" size={16} color={colors.accent.green} />
              <Text style={styles.formatText}>PDF Documents</Text>
            </View>
            <View style={styles.formatItem}>
              <Icon name="check" size={16} color={colors.accent.green} />
              <Text style={styles.formatText}>Excel BOM (.xlsx)</Text>
            </View>
            <View style={styles.formatItem}>
              <Icon name="check" size={16} color={colors.accent.green} />
              <Text style={styles.formatText}>Images (.jpg, .png)</Text>
            </View>
          </View>
        </View>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <View style={styles.uploadedSection}>
            <Text style={styles.uploadedTitle}>
              Uploaded Files ({uploadedFiles.length})
            </Text>
            <View style={styles.filesList}>
              {uploadedFiles.map((file, index) => (
                <View key={index} style={styles.fileCard}>
                  <View style={styles.fileIcon}>
                    <Icon name="file" size={24} color={colors.accent.green} />
                  </View>
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName} numberOfLines={1}>
                      {file.name || file.fileName}
                    </Text>
                    <Text style={styles.fileSize}>
                      {((file.size || file.fileSize) / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFile(index)}
                    style={styles.removeButton}>
                    <Icon name="x" size={20} color={colors.semantic.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <Icon name="zap" size={20} color={colors.accent.green} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Instant Processing</Text>
              <Text style={styles.featureDescription}>
                AI analyzes your diagram in seconds
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Icon name="shield" size={20} color={colors.accent.blue} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Secure Upload</Text>
              <Text style={styles.featureDescription}>
                Your files are encrypted and protected
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Icon name="check-circle" size={20} color={colors.accent.yellow} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Quality Guaranteed</Text>
              <Text style={styles.featureDescription}>
                ISO 9001 certified manufacturers
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      {uploadedFiles.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}>
            <Text style={styles.continueButtonText}>Continue to Review</Text>
            <Icon name="arrow-right" size={20} color={colors.neutral.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  header: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  uploadOptions: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  uploadOption: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.neutral.gray[200],
    borderStyle: 'dashed',
    alignItems: 'center',
    ...shadows.sm,
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  optionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
    textAlign: 'center',
  },
  formatsCard: {
    backgroundColor: colors.neutral.gray[50],
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  formatsTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.sm,
  },
  formatsList: {
    gap: spacing.sm,
  },
  formatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  formatText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  uploadedSection: {
    marginBottom: spacing.xl,
  },
  uploadedTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.md,
  },
  filesList: {
    gap: spacing.sm,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray[50],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.accent.green}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.gray[900],
  },
  fileSize: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  removeButton: {
    padding: spacing.sm,
  },
  features: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  feature: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  footer: {
    padding: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray[200],
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: colors.accent.green,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    ...shadows.md,
  },
  continueButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
});
