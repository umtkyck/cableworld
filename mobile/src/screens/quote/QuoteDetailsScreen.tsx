import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@navigation/index';
import {colors, spacing, typography, borderRadius, shadows} from '@/theme';
import Icon from 'react-native-vector-icons/Feather';

type QuoteDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'QuoteDetails'>;
  route: RouteProp<RootStackParamList, 'QuoteDetails'>;
};

export default function QuoteDetailsScreen({navigation, route}: QuoteDetailsScreenProps) {
  const {quoteId} = route.params;

  const quote = {
    id: quoteId,
    name: 'Control Panel Harness',
    quantity: 50,
    unitPrice: 49.00,
    total: 2450.00,
    leadTime: '15 business days',
    validUntil: '2024-11-20',
    items: [
      {name: 'Components', price: 625.00},
      {name: 'Labor', price: 875.00},
      {name: 'Testing & QC', price: 150.00},
      {name: 'Shipping', price: 125.00},
    ],
  };

  const handleAcceptQuote = () => {
    Alert.alert(
      'Accept Quote',
      'Proceed to checkout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Continue', onPress: () => console.log('Checkout')},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutral.white} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.neutral.gray[900]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quote Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-2" size={20} color={colors.neutral.gray[700]} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        <View style={styles.quoteCard}>
          <Text style={styles.quoteId}>Quote #{quote.id}</Text>
          <Text style={styles.quoteName}>{quote.name}</Text>
          <Text style={styles.quoteValidity}>Valid until {quote.validUntil}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Price Breakdown</Text>
          <View style={styles.itemsList}>
            {quote.items.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${quote.total.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.unitLabel}>Unit Price</Text>
              <Text style={styles.unitValue}>${quote.unitPrice.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery</Text>
          <View style={styles.infoRow}>
            <Icon name="clock" size={20} color={colors.accent.green} />
            <View>
              <Text style={styles.infoLabel}>Lead Time</Text>
              <Text style={styles.infoValue}>{quote.leadTime}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptQuote}>
          <Text style={styles.acceptButtonText}>Accept Quote & Checkout</Text>
          <Icon name="arrow-right" size={20} color={colors.neutral.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.neutral.gray[50]},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.xl, paddingTop: spacing.xxl, backgroundColor: colors.neutral.white},
  backButton: {width: 40, height: 40, borderRadius: borderRadius.lg, backgroundColor: colors.neutral.gray[100], alignItems: 'center', justifyContent: 'center'},
  headerTitle: {fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.neutral.gray[900]},
  shareButton: {width: 40, height: 40, alignItems: 'center', justifyContent: 'center'},
  content: {flex: 1},
  contentContainer: {padding: spacing.xl, paddingBottom: 120},
  quoteCard: {backgroundColor: `${colors.accent.green}15`, borderRadius: borderRadius.xl, padding: spacing.md, marginBottom: spacing.md},
  quoteId: {fontSize: typography.sizes.sm, color: colors.neutral.gray[700], marginBottom: 4},
  quoteName: {fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.neutral.gray[900], marginBottom: 4},
  quoteValidity: {fontSize: typography.sizes.sm, color: colors.neutral.gray[600]},
  card: {backgroundColor: colors.neutral.white, borderRadius: borderRadius.xl, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm},
  cardTitle: {fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.neutral.gray[900], marginBottom: spacing.md},
  itemsList: {gap: spacing.sm, marginBottom: spacing.md},
  item: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.sm},
  itemName: {fontSize: typography.sizes.base, color: colors.neutral.gray[700]},
  itemPrice: {fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.neutral.gray[900]},
  totalSection: {borderTopWidth: 1, borderTopColor: colors.neutral.gray[200], paddingTop: spacing.md, gap: spacing.sm},
  totalRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  totalLabel: {fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.neutral.gray[900]},
  totalValue: {fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.accent.green},
  unitLabel: {fontSize: typography.sizes.sm, color: colors.neutral.gray[600]},
  unitValue: {fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.neutral.gray[700]},
  infoRow: {flexDirection: 'row', gap: spacing.md, alignItems: 'center'},
  infoLabel: {fontSize: typography.sizes.sm, color: colors.neutral.gray[600], marginBottom: 2},
  infoValue: {fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.neutral.gray[900]},
  footer: {position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.xl, backgroundColor: colors.neutral.white, borderTopWidth: 1, borderTopColor: colors.neutral.gray[200], ...shadows.xl},
  acceptButton: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.accent.green, padding: spacing.md, borderRadius: borderRadius.lg, ...shadows.md},
  acceptButtonText: {fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.neutral.white},
});
