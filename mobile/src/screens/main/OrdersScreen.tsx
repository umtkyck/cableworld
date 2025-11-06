import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigation/index';
import {colors, spacing, typography, borderRadius, shadows} from '@/theme';
import Icon from 'react-native-vector-icons/Feather';

type OrdersScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

export default function OrdersScreen({navigation}: OrdersScreenProps) {
  const [selectedTab, setSelectedTab] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      name: 'Control Panel Harness',
      status: 'In Production',
      statusColor: colors.accent.blue,
      progress: 65,
      date: '2024-11-05',
      quantity: 50,
      total: 2450.00,
    },
    {
      id: 'ORD-002',
      name: 'Sensor Cable Assembly',
      status: 'In Transit',
      statusColor: colors.accent.yellow,
      progress: 90,
      date: '2024-11-03',
      quantity: 100,
      total: 3200.00,
    },
    {
      id: 'ORD-003',
      name: 'Power Distribution Harness',
      status: 'Delivered',
      statusColor: colors.semantic.success,
      progress: 100,
      date: '2024-10-28',
      quantity: 25,
      total: 1875.00,
    },
    {
      id: 'ORD-004',
      name: 'Signal Wire Harness',
      status: 'Quote Ready',
      statusColor: colors.accent.green,
      progress: 100,
      date: '2024-11-06',
      quantity: 200,
      total: 5600.00,
    },
  ];

  const tabs = [
    {key: 'all', label: 'All', count: orders.length},
    {key: 'active', label: 'Active', count: 2},
    {key: 'completed', label: 'Completed', count: 1},
    {key: 'quotes', label: 'Quotes', count: 1},
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Production':
        return 'tool';
      case 'In Transit':
        return 'truck';
      case 'Delivered':
        return 'check-circle';
      case 'Quote Ready':
        return 'file-text';
      default:
        return 'package';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutral.white} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="sliders" size={20} color={colors.neutral.gray[700]} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              selectedTab === tab.key && styles.tabActive,
            ]}
            onPress={() => setSelectedTab(tab.key)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab.key && styles.tabTextActive,
              ]}>
              {tab.label}
            </Text>
            <View style={[
              styles.tabBadge,
              selectedTab === tab.key && styles.tabBadgeActive,
            ]}>
              <Text style={[
                styles.tabBadgeText,
                selectedTab === tab.key && styles.tabBadgeTextActive,
              ]}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      <ScrollView
        style={styles.ordersList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersContent}>
        {orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetails', {orderId: order.id})}
            activeOpacity={0.7}>

            {/* Header */}
            <View style={styles.orderHeader}>
              <View style={styles.orderIdContainer}>
                <View style={[
                  styles.orderIcon,
                  {backgroundColor: `${order.statusColor}15`}
                ]}>
                  <Icon
                    name={getStatusIcon(order.status)}
                    size={20}
                    color={order.statusColor}
                  />
                </View>
                <View>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderName}>{order.name}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color={colors.neutral.gray[400]} />
            </View>

            {/* Progress */}
            {order.progress < 100 && (
              <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${order.progress}%`,
                        backgroundColor: order.statusColor,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{order.progress}%</Text>
              </View>
            )}

            {/* Info */}
            <View style={styles.orderInfo}>
              <View style={styles.infoItem}>
                <Icon name="calendar" size={14} color={colors.neutral.gray[500]} />
                <Text style={styles.infoText}>{order.date}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="package" size={14} color={colors.neutral.gray[500]} />
                <Text style={styles.infoText}>{order.quantity} units</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="dollar-sign" size={14} color={colors.neutral.gray[500]} />
                <Text style={styles.infoText}>${order.total.toFixed(2)}</Text>
              </View>
            </View>

            {/* Status Badge */}
            <View style={styles.orderFooter}>
              <View style={[
                styles.statusBadge,
                {backgroundColor: `${order.statusColor}15`}
              ]}>
                <View style={[
                  styles.statusDot,
                  {backgroundColor: order.statusColor}
                ]} />
                <Text style={[
                  styles.statusText,
                  {color: order.statusColor}
                ]}>
                  {order.status}
                </Text>
              </View>

              {order.status === 'In Transit' && (
                <TouchableOpacity
                  style={styles.trackButton}
                  onPress={() => navigation.navigate('Tracking', {orderId: order.id})}>
                  <Icon name="map-pin" size={14} color={colors.accent.green} />
                  <Text style={styles.trackButtonText}>Track</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    backgroundColor: colors.neutral.white,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    backgroundColor: colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray[200],
  },
  tabsContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.gray[100],
  },
  tabActive: {
    backgroundColor: colors.accent.green,
  },
  tabText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[700],
  },
  tabTextActive: {
    color: colors.neutral.white,
  },
  tabBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[700],
  },
  tabBadgeTextActive: {
    color: colors.neutral.white,
  },
  ordersList: {
    flex: 1,
  },
  ordersContent: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  orderCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.sm,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  orderIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderId: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[600],
    marginBottom: 2,
  },
  orderName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.neutral.gray[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[600],
    width: 35,
    textAlign: 'right',
  },
  orderInfo: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[600],
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    backgroundColor: `${colors.accent.green}15`,
  },
  trackButtonText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.accent.green,
  },
});
