import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { colors, spacing, typography } from '../../theme';
import paymentService from '../../services/payment';

type PaymentScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{
    params: {
      quoteId: string;
      amount: number;
      customerEmail?: string;
      customerName?: string;
    };
  }>;
};

export default function PaymentScreen({ navigation, route }: PaymentScreenProps) {
  const { quoteId, amount, customerEmail, customerName } = route.params;

  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const { confirmPayment } = useConfirmPayment();

  useEffect(() => {
    initializePayment();
  }, []);

  const initializePayment = async () => {
    try {
      setLoading(true);
      const { clientSecret: secret } = await paymentService.createPaymentIntent({
        amount,
        quoteId,
        customerEmail,
        customerName,
      });
      setClientSecret(secret);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to initialize payment');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!cardComplete) {
      Alert.alert('Error', 'Please enter complete card details');
      return;
    }

    if (!clientSecret) {
      Alert.alert('Error', 'Payment not initialized');
      return;
    }

    try {
      setProcessing(true);

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: customerEmail,
            name: customerName,
          },
        },
      });

      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent) {
        // Navigate to success screen
        navigation.replace('PaymentSuccess', {
          quoteId,
          amount,
          paymentIntentId: paymentIntent.id,
        });
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
        <Text style={styles.loadingText}>Initializing secure checkout...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Payment Details</Text>
          <Text style={styles.subtitle}>Enter your card information</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Quote ID</Text>
            <Text style={styles.summaryValue}>{quoteId}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryAmount}>
              {paymentService.formatAmount(amount)}
            </Text>
          </View>
        </View>

        {/* Card Input */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardLabel}>Card Information</Text>
          <CardField
            postalCodeEnabled={true}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: colors.neutral.white,
              textColor: colors.neutral.gray[900],
              borderRadius: 8,
            }}
            style={styles.cardField}
            onCardChange={(cardDetails) => {
              setCardComplete(cardDetails.complete);
            }}
          />
          <Text style={styles.cardHint}>
            Use test card: 4242 4242 4242 4242
          </Text>
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <View style={styles.securityIconContainer}>
            <Text style={styles.securityIcon}>🔒</Text>
          </View>
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Secure Payment</Text>
            <Text style={styles.securityDescription}>
              Your payment information is encrypted and processed securely by Stripe.
            </Text>
          </View>
        </View>

        {/* Payment Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Payment Breakdown</Text>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Components</Text>
            <Text style={styles.breakdownValue}>$1,420.00</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Labor & Assembly</Text>
            <Text style={styles.breakdownValue}>$980.00</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Testing & QA</Text>
            <Text style={styles.breakdownValue}>$250.00</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Shipping</Text>
            <Text style={styles.breakdownValue}>$197.00</Text>
          </View>
          <View style={[styles.breakdownRow, styles.breakdownTotal]}>
            <Text style={styles.breakdownTotalLabel}>Total</Text>
            <Text style={styles.breakdownTotalValue}>
              {paymentService.formatAmount(amount)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.payButton,
            (!cardComplete || processing) && styles.payButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={!cardComplete || processing}
        >
          {processing ? (
            <ActivityIndicator color={colors.neutral.white} />
          ) : (
            <Text style={styles.payButtonText}>
              Pay {paymentService.formatAmount(amount)}
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.footerText}>
          By confirming, you agree to our terms and conditions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.gray[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray[50],
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primary[500],
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  summaryCard: {
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
  summaryTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.primary[500],
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  summaryValue: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.gray[900],
  },
  summaryAmount: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary[500],
  },
  cardContainer: {
    marginBottom: spacing.lg,
  },
  cardLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.sm,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: spacing.sm,
  },
  cardHint: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[500],
    marginTop: spacing.xs,
  },
  securityNotice: {
    flexDirection: 'row',
    backgroundColor: colors.semantic.success + '20',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  securityIconContainer: {
    marginRight: spacing.md,
  },
  securityIcon: {
    fontSize: typography.sizes.xl,
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.xs,
  },
  securityDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
    lineHeight: 20,
  },
  breakdownCard: {
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
  breakdownTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.primary[500],
    marginBottom: spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  breakdownLabel: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  breakdownValue: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[900],
  },
  breakdownTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray[200],
    paddingTop: spacing.md,
    marginTop: spacing.sm,
  },
  breakdownTotalLabel: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  breakdownTotalValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary[500],
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray[200],
  },
  payButton: {
    backgroundColor: colors.accent.green,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  payButtonDisabled: {
    opacity: 0.5,
  },
  payButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
  footerText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[500],
    textAlign: 'center',
  },
});
