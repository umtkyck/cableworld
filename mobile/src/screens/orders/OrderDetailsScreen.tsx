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
import LinearGradient from 'react-native-linear-gradient';

type OrderDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OrderDetails'>;
  route: RouteProp<RootStackParamList, 'OrderDetails'>;
};

export default function OrderDetailsScreen({navigation, route}: OrderDetailsScreenProps) {
  const {orderId} = route.params;

  const order = {
    id: orderId,
    name: 'Control Panel Harness',
    status: 'In Production',
    statusColor: colors.accent.blue,
    progress: 65,
    orderDate: '2024-11-05',
    estimatedDelivery: '2024-11-20',
    quantity: 50,
    unitPrice: 49.00,
    total: 2450.00,
    items: [
      {name: '6-pin Connector', quantity: 100, price: 2.50},
      {name: '18AWG Wire - Red', quantity: 50, price: 15.00},
      {name: 'Crimp Terminals', quantity: 200, price: 0.30},
    ],
    timeline: [
      {status: 'Order Placed', date: '2024-11-05 10:30 AM', completed: true},
      {status: 'Design Approved', date: '2024-11-05 2:15 PM', completed: true},
      {status: 'In Production', date: '2024-11-06 9:00 AM', completed: true, active: true},
      {status: 'Quality Check', date: 'Pending', completed: false},
      {status: 'Shipped', date: 'Pending', completed: false},
      {status: 'Delivered', date: 'Pending', completed: false},
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary[500]} />

      {/* Header */}
      <LinearGradient
        colors={[colors.primary[500], colors.primary[700]]}
        style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.neutral.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more-vertical" size={24} color={colors.neutral.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.orderIdCard}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderName}>{order.name}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>

        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.statusHeader}>
            <View style={[styles.statusIcon, {backgroundColor: `${order.statusColor}15`}]}>
              <Icon name="package" size={24} color={order.statusColor} />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusLabel}>Current Status</Text>
              <Text style={[styles.statusText, {color: order.statusColor}]}>
                {order.status}
              </Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {width: `${order.progress}%`, backgroundColor: order.statusColor}
                ]}
              />
            </View>
            <Text style={styles.progressText}>{order.progress}% Complete</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Timeline</Text>
          <View style={styles.timeline}>
            {order.timeline.map((item, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineDot,
                      item.completed && styles.timelineDotCompleted,
                      item.active && styles.timelineDotActive,
                    ]}>
                    {item.completed && (
                      <Icon name="check" size={12} color={colors.neutral.white} />
                    )}
                  </View>
                  {index < order.timeline.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        item.completed && styles.timelineLineCompleted,
                      ]}
                    />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text
                    style={[
                      styles.timelineStatus,
                      item.active && styles.timelineStatusActive,
                    ]}>
                    {item.status}
                  </Text>
                  <Text style={styles.timelineDate}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Order Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Icon name="calendar" size={18} color={colors.neutral.gray[600]} />
              <View>
                <Text style={styles.infoLabel}>Order Date</Text>
                <Text style={styles.infoValue}>{order.orderDate}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Icon name="truck" size={18} color={colors.neutral.gray[600]} />
              <View>
                <Text style={styles.infoLabel}>Est. Delivery</Text>
                <Text style={styles.infoValue}>{order.estimatedDelivery}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Icon name="package" size={18} color={colors.neutral.gray[600]} />
              <View>
                <Text style={styles.infoLabel}>Quantity</Text>
                <Text style={styles.infoValue}>{order.quantity} units</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Icon name="dollar-sign" size={18} color={colors.neutral.gray[600]} />
              <View>
                <Text style={styles.infoLabel}>Unit Price</Text>
                <Text style={styles.infoValue}>${order.unitPrice.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Items */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Items</Text>
          <View style={styles.itemsList}>
            {order.items.map((item, index) => (
              <View key={index} style={styles.item}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>${(item.quantity * item.price).toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Shipping</Text>
              <Text style={styles.totalValue}>$0.00</Text>
            </View>
            <View style={[styles.totalRow, styles.totalRowFinal]}>
              <Text style={styles.totalLabelFinal}>Total</Text>
              <Text style={styles.totalValueFinal}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Tracking', {orderId: order.id})}>
            <Icon name="map-pin" size={20} color={colors.accent.green} />
            <Text style={styles.actionButtonText}>Track Shipment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Icon name="download" size={20} color={colors.neutral.gray[700]} />
            <Text style={styles.actionButtonTextSecondary}>Download Invoice</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Icon name="headphones" size={20} color={colors.neutral.gray[700]} />
            <Text style={styles.actionButtonTextSecondary}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.gray[50],
  },
  header: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: borderRadius.xxl,
    borderBottomRightRadius: borderRadius.xxl,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
  moreButton: {
    width: 40,
    height: 40,
  },
  orderIdCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
  },
  orderId: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[200],
    marginBottom: 4,
  },
  orderName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statusIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
    marginBottom: 4,
  },
  statusText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  progressContainer: {
    gap: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.neutral.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[600],
    textAlign: 'right',
  },
  timeline: {
    gap: spacing.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral.gray[300],
    backgroundColor: colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotCompleted: {
    backgroundColor: colors.accent.green,
    borderColor: colors.accent.green,
  },
  timelineDotActive: {
    backgroundColor: colors.accent.blue,
    borderColor: colors.accent.blue,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.neutral.gray[200],
    marginVertical: 4,
  },
  timelineLineCompleted: {
    backgroundColor: colors.accent.green,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  timelineStatus: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.gray[700],
    marginBottom: 2,
  },
  timelineStatusActive: {
    color: colors.accent.blue,
    fontWeight: typography.weights.bold,
  },
  timelineDate: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[500],
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  infoItem: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.neutral.gray[50],
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  infoLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[600],
    marginBottom: 2,
  },
  infoValue: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
  },
  itemsList: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.neutral.gray[50],
    borderRadius: borderRadius.lg,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.gray[900],
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  itemPrice: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  totalSection: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray[200],
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalRowFinal: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray[200],
  },
  totalLabel: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  totalValue: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
  },
  totalLabelFinal: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  totalValueFinal: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.accent.green,
  },
  actions: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent.green,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  actionButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
  actionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.neutral.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.neutral.gray[200],
  },
  actionButtonTextSecondary: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[700],
  },
});
