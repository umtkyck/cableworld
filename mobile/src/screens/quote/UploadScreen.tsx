import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, typography} from '@/theme';

// Placeholder - this screen is implemented in QuoteScreen
export default function UploadScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload functionality is in QuoteScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.neutral.white},
  text: {fontSize: typography.sizes.lg, color: colors.neutral.gray[600]},
});
