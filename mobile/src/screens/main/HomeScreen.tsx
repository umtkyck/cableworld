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
import {RootStackParamList} from '@navigation/index';
import {colors, spacing, typography, borderRadius, shadows} from '@/theme';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

export default function HomeScreen({navigation}: HomeScreenProps) {
  const stats = [
    {icon: 'zap', label: 'Active Quotes', value: '3', color: colors.accent.green},
    {icon: 'package', label: 'In Production', value: '2', color: colors.accent.blue},
    {icon: 'truck', label: 'In Transit', value: '1', color: colors.accent.yellow},
    {icon: 'check-circle', label: 'Completed', value: '12', color: colors.semantic.success},
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      name: 'Control Panel Harness',
      status: 'In Production',
      progress: 65,
      date: '2024-11-05',
    },
    {
      id: 'ORD-002',
      name: 'Sensor Cable Assembly',
      status: 'In Transit',
      progress: 90,
      date: '2024-11-03',
    },
    {
      id: 'ORD-003',
      name: 'Power Distribution',
      status: 'Quote Ready',
      progress: 100,
      date: '2024-11-06',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary[500]} />

      {/* Header */}
      <LinearGradient
        colors={[colors.primary[500], colors.primary[700]]}
        style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell" size={24} color={colors.neutral.white} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Action */}
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigation.navigate('Upload')}
          activeOpacity={0.9}>
          <View style={styles.quickActionContent}>
            <View style={styles.quickActionIcon}>
              <Icon name="plus-circle" size={32} color={colors.accent.green} />
            </View>
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>Get Instant Quote</Text>
              <Text style={styles.quickActionSubtitle}>Upload diagram or take photo</Text>
            </View>
            <Icon name="arrow-right" size={24} color={colors.neutral.gray[400]} />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, {backgroundColor: `${stat.color}20`}]}>
                <Icon name={stat.icon} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ordersList}>
            {recentOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => navigation.navigate('OrderDetails', {orderId: order.id})}
                activeOpacity={0.7}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.orderName}>{order.name}</Text>
                  </View>
                  <Icon name="chevron-right" size={20} color={colors.neutral.gray[400]} />
                </View>

                <View style={styles.orderProgress}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, {width: `${order.progress}%`}]} />
                  </View>
                  <Text style={styles.progressText}>{order.progress}%</Text>
                </View>

                <View style={styles.orderFooter}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinks}>
            <TouchableOpacity style={styles.quickLink}>
              <Icon name="book-open" size={24} color={colors.accent.green} />
              <Text style={styles.quickLinkText}>Documentation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickLink}>
              <Icon name="headphones" size={24} color={colors.accent.blue} />
              <Text style={styles.quickLinkText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickLink}>
              <Icon name="file-text" size={24} color={colors.accent.yellow} />
              <Text style={styles.quickLinkText}>Invoices</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickLink}>
              <Icon name="settings" size={24} color={colors.neutral.gray[600]} />
              <Text style={styles.quickLinkText}>Settings</Text>
            </TouchableOpacity>
          </View>
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
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    borderBottomLeftRadius: borderRadius.xxl,
    borderBottomRightRadius: borderRadius.xxl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[300],
  },
  userName: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.semantic.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
  quickAction: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.md,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.accent.green}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  quickActionSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[600],
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
  },
  seeAll: {
    fontSize: typography.sizes.sm,
    color: colors.accent.green,
    fontWeight: typography.weights.semibold,
  },
  ordersList: {
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
  orderId: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  orderName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
  },
  orderProgress: {
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
    backgroundColor: colors.accent.green,
  },
  progressText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[600],
    width: 35,
    textAlign: 'right',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: `${colors.accent.green}15`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.accent.green,
  },
  orderDate: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[500],
  },
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  quickLink: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.sm,
  },
  quickLinkText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral.gray[700],
    textAlign: 'center',
  },
});
