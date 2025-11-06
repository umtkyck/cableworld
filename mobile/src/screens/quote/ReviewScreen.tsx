import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@navigation/index';
import {colors, spacing, typography, borderRadius, shadows} from '@/theme';
import Icon from 'react-native-vector-icons/Feather';

type ReviewScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Review'>;
  route: RouteProp<RootStackParamList, 'Review'>;
};

export default function ReviewScreen({navigation, route}: ReviewScreenProps) {
  const {fileId} = route.params;

  // Simulated parsed data
  const parsedData = {
    confidence: 95,
    components: [
      {id: 1, name: 'TE Connectivity 6-pin Connector', quantity: 2, status: 'verified'},
      {id: 2, name: '18AWG Wire - Red', quantity: 5, unit: 'meters', status: 'verified'},
      {id: 3, name: 'Crimp Terminals', quantity: 12, status: 'needs_review'},
    ],
    specifications: {
      totalLength: '2.5m',
      connectors: 12,
      wires: 24,
      complexity: 'Moderate',
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutral.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.neutral.gray[900]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Components</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>

        {/* Confidence Score */}
        <View style={styles.confidenceCard}>
          <View style={styles.confidenceHeader}>
            <Icon name="check-circle" size={24} color={colors.accent.green} />
            <View style={styles.confidenceInfo}>
              <Text style={styles.confidenceLabel}>Parsing Confidence</Text>
              <Text style={styles.confidenceValue}>{parsedData.confidence}%</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {width: `${parsedData.confidence}%`}]} />
          </View>
        </View>

        {/* Specifications */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Harness Specifications</Text>
          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <Icon name="maximize-2" size={18} color={colors.accent.green} />
              <View>
                <Text style={styles.specLabel}>Total Length</Text>
                <Text style={styles.specValue}>{parsedData.specifications.totalLength}</Text>
              </View>
            </View>
            <View style={styles.specItem}>
              <Icon name="zap" size={18} color={colors.accent.blue} />
              <View>
                <Text style={styles.specLabel}>Connectors</Text>
                <Text style={styles.specValue}>{parsedData.specifications.connectors}</Text>
              </View>
            </View>
            <View style={styles.specItem}>
              <Icon name="activity" size={18} color={colors.accent.yellow} />
              <View>
                <Text style={styles.specLabel}>Wires</Text>
                <Text style={styles.specValue}>{parsedData.specifications.wires}</Text>
              </View>
            </View>
            <View style={styles.specItem}>
              <Icon name="layers" size={18} color={colors.semantic.info} />
              <View>
                <Text style={styles.specLabel}>Complexity</Text>
                <Text style={styles.specValue}>{parsedData.specifications.complexity}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Components List */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Detected Components</Text>
            <Text style={styles.componentCount}>{parsedData.components.length} items</Text>
          </View>

          <View style={styles.componentsList}>
            {parsedData.components.map((component) => (
              <View key={component.id} style={styles.component}>
                <View style={styles.componentLeft}>
                  <View
                    style={[
                      styles.statusIndicator,
                      {
                        backgroundColor:
                          component.status === 'verified'
                            ? colors.accent.green
                            : colors.accent.yellow,
                      },
                    ]}
                  />
                  <View style={styles.componentInfo}>
                    <Text style={styles.componentName}>{component.name}</Text>
                    <View style={styles.componentMeta}>
                      <Text style={styles.componentQuantity}>
                        Qty: {component.quantity}
                        {component.unit && ` ${component.unit}`}
                      </Text>
                      {component.status === 'needs_review' && (
                        <View style={styles.reviewBadge}>
                          <Icon name="alert-circle" size={12} color={colors.accent.yellow} />
                          <Text style={styles.reviewText}>Needs Review</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.editButton}>
                  <Icon name="edit-2" size={18} color={colors.neutral.gray[600]} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.addComponent}>
            <Icon name="plus-circle" size={20} color={colors.accent.green} />
            <Text style={styles.addComponentText}>Add Component</Text>
          </TouchableOpacity>
        </View>

        {/* DFM Analysis */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>DFM Analysis</Text>
            <View style={styles.dfmBadge}>
              <Icon name="check" size={14} color={colors.accent.green} />
              <Text style={styles.dfmText}>Passed</Text>
            </View>
          </View>

          <View style={styles.dfmItems}>
            <View style={styles.dfmItem}>
              <Icon name="check-circle" size={20} color={colors.accent.green} />
              <Text style={styles.dfmItemText}>Wire gauge appropriate for amperage</Text>
            </View>
            <View style={styles.dfmItem}>
              <Icon name="check-circle" size={20} color={colors.accent.green} />
              <Text style={styles.dfmItemText}>Connector pin count matches</Text>
            </View>
            <View style={styles.dfmItem}>
              <Icon name="alert-circle" size={20} color={colors.accent.yellow} />
              <Text style={styles.dfmItemText}>
                Consider strain relief for improved durability
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Estimated Quote</Text>
          <Text style={styles.priceValue}>$245.50</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('QuoteDetails', {quoteId: '123'})}>
          <Text style={styles.continueButtonText}>Get Detailed Quote</Text>
          <Icon name="arrow-right" size={20} color={colors.neutral.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    backgroundColor: colors.neutral.white,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: 120,
  },
  confidenceCard: {
    backgroundColor: `${colors.accent.green}15`,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  confidenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  confidenceInfo: {
    flex: 1,
  },
  confidenceLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[700],
    marginBottom: 2,
  },
  confidenceValue: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.accent.green,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.neutral.white,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.green,
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  componentCount: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  specItem: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.neutral.gray[50],
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  specLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[600],
    marginBottom: 2,
  },
  specValue: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  componentsList: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  component: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.neutral.gray[50],
    borderRadius: borderRadius.lg,
  },
  componentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  statusIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  componentInfo: {
    flex: 1,
  },
  componentName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.gray[900],
    marginBottom: 4,
  },
  componentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  componentQuantity: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  reviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${colors.accent.yellow}15`,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  reviewText: {
    fontSize: 10,
    fontWeight: typography.weights.semibold,
    color: colors.accent.yellow,
  },
  editButton: {
    padding: spacing.sm,
  },
  addComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.accent.green,
    borderStyle: 'dashed',
    borderRadius: borderRadius.lg,
  },
  addComponentText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.accent.green,
  },
  dfmBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${colors.accent.green}15`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  dfmText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.accent.green,
  },
  dfmItems: {
    gap: spacing.sm,
  },
  dfmItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  dfmItemText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[700],
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
    backgroundColor: colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray[200],
    ...shadows.xl,
  },
  priceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  priceLabel: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  priceValue: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.accent.green,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent.green,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  continueButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
});
