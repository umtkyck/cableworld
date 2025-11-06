import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, typography } from '../../theme';
import paymentService from '../../services/payment';

type PaymentSuccessScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{
    params: {
      quoteId: string;
      amount: number;
      paymentIntentId: string;
    };
  }>;
};

export default function PaymentSuccessScreen({
  navigation,
  route,
}: PaymentSuccessScreenProps) {
  const { quoteId, amount, paymentIntentId } = route.params;

  const handleTrackOrder = () => {
    navigation.navigate('OrderDetails', { orderId: quoteId });
  };

  const handleReturnHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successCheckmark}>✓</Text>
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>Thank you for your order</Text>

        {/* Order Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Confirmation</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Number</Text>
            <Text style={styles.detailValue}>{quoteId}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount Paid</Text>
            <Text style={styles.detailAmount}>
              {paymentService.formatAmount(amount)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment ID</Text>
            <Text style={styles.detailValueSmall} numberOfLines={1}>
              {paymentIntentId.substring(0, 20)}...
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Production Starting</Text>
            </View>
          </View>
        </View>

        {/* Email Notice */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeIcon}>📧</Text>
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Receipt sent to your email</Text>
            <Text style={styles.noticeText}>
              You'll receive a confirmation email with your receipt and order details
              shortly.
            </Text>
          </View>
        </View>

        {/* What's Next */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What Happens Next?</Text>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Production Starts Immediately</Text>
              <Text style={styles.stepDescription}>
                Our team will begin manufacturing your cable harnesses right away.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Quality Testing & Inspection</Text>
              <Text style={styles.stepDescription}>
                100% electrical testing and visual inspection for IPC-620 compliance.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Shipping & Delivery</Text>
              <Text style={styles.stepDescription}>
                Ships within 7-10 business days with tracking information.
              </Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Test Reports Included</Text>
              <Text style={styles.stepDescription}>
                Complete test documentation and certificates included.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleTrackOrder}>
          <Text style={styles.primaryButtonText}>Track Your Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleReturnHome}>
          <Text style={styles.secondaryButtonText}>Return to Home</Text>
        </TouchableOpacity>

        {/* Support Link */}
        <View style={styles.supportContainer}>
          <Text style={styles.supportText}>Need help with your order?</Text>
          <TouchableOpacity>
            <Text style={styles.supportLink}>Contact Support →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.gray[50],
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  successIconContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.semantic.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCheckmark: {
    fontSize: 48,
    color: colors.semantic.success,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.neutral.gray[600],
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.primary[500],
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray[100],
  },
  detailLabel: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  detailValue: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
  },
  detailValueSmall: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.gray[900],
    fontFamily: 'monospace',
    maxWidth: 150,
  },
  detailAmount: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary[500],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.semantic.success + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.semantic.success,
    marginRight: spacing.xs,
  },
  statusText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.semantic.success,
  },
  noticeCard: {
    backgroundColor: colors.accent.blue + '15',
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noticeIcon: {
    fontSize: typography.sizes.xl,
    marginRight: spacing.md,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.xs,
  },
  noticeText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[700],
    lineHeight: 20,
  },
  step: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primary[500] + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary[500],
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.xs,
  },
  stepDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
    lineHeight: 20,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray[200],
  },
  primaryButton: {
    backgroundColor: colors.accent.green,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  primaryButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
  secondaryButton: {
    backgroundColor: colors.neutral.white,
    borderWidth: 2,
    borderColor: colors.primary[500],
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  secondaryButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary[500],
  },
  supportContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  supportText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
    marginBottom: spacing.xs,
  },
  supportLink: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.primary[500],
  },
});
