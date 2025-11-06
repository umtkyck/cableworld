import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@navigation/index';
import {colors, spacing, typography, borderRadius, shadows} from '@/theme';
import Icon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

type TrackingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Tracking'>;
  route: RouteProp<RootStackParamList, 'Tracking'>;
};

export default function TrackingScreen({navigation, route}: TrackingScreenProps) {
  const {orderId} = route.params;

  const tracking = {
    orderId,
    carrier: 'FedEx',
    trackingNumber: '1234567890123',
    estimatedDelivery: '2024-11-20',
    currentLocation: 'Los Angeles, CA',
    status: 'In Transit',
    progress: 75,
    updates: [
      {
        status: 'Out for Delivery',
        location: 'Los Angeles, CA',
        date: '2024-11-15 08:30 AM',
        icon: 'truck',
        completed: false,
      },
      {
        status: 'Arrived at Facility',
        location: 'Los Angeles Distribution Center',
        date: '2024-11-15 06:15 AM',
        icon: 'home',
        completed: true,
      },
      {
        status: 'In Transit',
        location: 'Phoenix, AZ',
        date: '2024-11-14 10:45 PM',
        icon: 'navigation',
        completed: true,
      },
      {
        status: 'Departed Facility',
        location: 'Dallas, TX',
        date: '2024-11-14 3:20 PM',
        icon: 'send',
        completed: true,
      },
      {
        status: 'Package Received',
        location: 'Origin Facility - Dallas, TX',
        date: '2024-11-13 2:00 PM',
        icon: 'package',
        completed: true,
      },
    ],
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
        <Text style={styles.headerTitle}>Track Shipment</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-2" size={20} color={colors.neutral.gray[700]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Icon name="map" size={48} color={colors.neutral.gray[400]} />
            <Text style={styles.mapText}>Real-time tracking map will be displayed here</Text>
          </View>
          <View style={styles.mapOverlay}>
            <View style={styles.locationCard}>
              <Icon name="map-pin" size={20} color={colors.accent.green} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Current Location</Text>
                <Text style={styles.locationValue}>{tracking.currentLocation}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.carrierBadge}>
              <Icon name="truck" size={20} color={colors.accent.green} />
              <Text style={styles.carrierText}>{tracking.carrier}</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{tracking.status}</Text>
            </View>
          </View>

          <View style={styles.trackingInfo}>
            <View style={styles.trackingRow}>
              <Text style={styles.trackingLabel}>Tracking Number</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Text style={styles.trackingNumber}>{tracking.trackingNumber}</Text>
                <Icon name="copy" size={16} color={colors.accent.green} />
              </TouchableOpacity>
            </View>

            <View style={styles.trackingRow}>
              <Text style={styles.trackingLabel}>Estimated Delivery</Text>
              <Text style={styles.trackingValue}>{tracking.estimatedDelivery}</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: `${tracking.progress}%`}]} />
            </View>
            <Text style={styles.progressText}>{tracking.progress}% Complete</Text>
          </View>
        </View>

        {/* Tracking Updates */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shipping Updates</Text>
          <View style={styles.timeline}>
            {tracking.updates.map((update, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineDot,
                      update.completed && styles.timelineDotCompleted,
                      index === 0 && !update.completed && styles.timelineDotActive,
                    ]}>
                    <Icon
                      name={update.icon}
                      size={14}
                      color={
                        update.completed || index === 0
                          ? colors.neutral.white
                          : colors.neutral.gray[400]
                      }
                    />
                  </View>
                  {index < tracking.updates.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        update.completed && styles.timelineLineCompleted,
                      ]}
                    />
                  )}
                </View>

                <View style={styles.timelineContent}>
                  <Text
                    style={[
                      styles.updateStatus,
                      (update.completed || index === 0) && styles.updateStatusActive,
                    ]}>
                    {update.status}
                  </Text>
                  <Text style={styles.updateLocation}>{update.location}</Text>
                  <Text style={styles.updateDate}>{update.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Information</Text>
          <View style={styles.deliveryInfo}>
            <View style={styles.infoRow}>
              <Icon name="home" size={18} color={colors.neutral.gray[600]} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Delivery Address</Text>
                <Text style={styles.infoValue}>
                  1234 Main Street{'\n'}
                  Los Angeles, CA 90001
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Icon name="user" size={18} color={colors.neutral.gray[600]} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Recipient</Text>
                <Text style={styles.infoValue}>John Doe</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Icon name="phone" size={18} color={colors.neutral.gray[600]} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Contact Number</Text>
                <Text style={styles.infoValue}>(555) 123-4567</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="bell" size={20} color={colors.accent.green} />
            <Text style={styles.actionButtonText}>Get Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Icon name="headphones" size={20} color={colors.neutral.gray[700]} />
            <Text style={styles.actionButtonTextSecondary}>Contact Carrier</Text>
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
  shareButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  mapContainer: {
    height: 250,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.neutral.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  mapText: {
    marginTop: spacing.md,
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
    textAlign: 'center',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    right: spacing.md,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.neutral.white,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[600],
    marginBottom: 2,
  },
  locationValue: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
  },
  statusCard: {
    backgroundColor: colors.neutral.white,
    margin: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  carrierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: `${colors.accent.green}15`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
  },
  carrierText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.accent.green,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.green,
  },
  statusText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[700],
  },
  trackingInfo: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  trackingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackingLabel: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  trackingNumber: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
    marginRight: spacing.xs,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingValue: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[900],
  },
  progressContainer: {
    gap: spacing.sm,
  },
  progressBar: {
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
    textAlign: 'right',
  },
  card: {
    backgroundColor: colors.neutral.white,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.md,
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
    width: 32,
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotCompleted: {
    backgroundColor: colors.accent.green,
  },
  timelineDotActive: {
    backgroundColor: colors.accent.blue,
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
  updateStatus: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.neutral.gray[600],
    marginBottom: 2,
  },
  updateStatusActive: {
    color: colors.neutral.gray[900],
    fontWeight: typography.weights.bold,
  },
  updateLocation: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
    marginBottom: 2,
  },
  updateDate: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[500],
  },
  deliveryInfo: {
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[600],
    marginBottom: 4,
  },
  infoValue: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[900],
    lineHeight: 20,
  },
  actions: {
    marginHorizontal: spacing.xl,
    gap: spacing.sm,
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
