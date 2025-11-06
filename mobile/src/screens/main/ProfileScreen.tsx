import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigation/index';
import {colors, spacing, typography, borderRadius, shadows} from '@/theme';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

export default function ProfileScreen({navigation}: ProfileScreenProps) {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', onPress: () => console.log('Logout'), style: 'destructive'},
      ]
    );
  };

  const menuItems = [
    {
      section: 'Account',
      items: [
        {icon: 'user', label: 'Edit Profile', screen: null},
        {icon: 'briefcase', label: 'Company Info', screen: null},
        {icon: 'credit-card', label: 'Payment Methods', screen: null},
        {icon: 'map-pin', label: 'Shipping Addresses', screen: null},
      ],
    },
    {
      section: 'Preferences',
      items: [
        {icon: 'bell', label: 'Notifications', screen: null},
        {icon: 'moon', label: 'Dark Mode', screen: null, toggle: true},
        {icon: 'globe', label: 'Language', screen: null, value: 'English'},
        {icon: 'dollar-sign', label: 'Currency', screen: null, value: 'USD'},
      ],
    },
    {
      section: 'Support',
      items: [
        {icon: 'help-circle', label: 'Help Center', screen: null},
        {icon: 'message-circle', label: 'Contact Support', screen: null},
        {icon: 'file-text', label: 'Terms & Privacy', screen: null},
        {icon: 'star', label: 'Rate App', screen: null},
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary[500]} />

      {/* Profile Header */}
      <LinearGradient
        colors={[colors.primary[500], colors.primary[700]]}
        style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[colors.accent.green, colors.accent.blue]}
              style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </LinearGradient>
            <TouchableOpacity style={styles.editAvatar}>
              <Icon name="camera" size={14} color={colors.neutral.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@company.com</Text>

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>$12.5K</Text>
              <Text style={styles.statLabel}>Spent</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>

        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    itemIndex === section.items.length - 1 && styles.menuItemLast,
                  ]}
                  onPress={() => console.log(item.label)}
                  activeOpacity={0.7}>
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <Icon name={item.icon} size={20} color={colors.neutral.gray[700]} />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.value && (
                      <Text style={styles.menuValue}>{item.value}</Text>
                    )}
                    <Icon name="chevron-right" size={20} color={colors.neutral.gray[400]} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}>
          <Icon name="log-out" size={20} color={colors.semantic.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>CableWorld v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 CableWorld. All rights reserved.</Text>
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
  profileContainer: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.neutral.white,
  },
  avatarText: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.neutral.white,
  },
  userName: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[300],
    marginBottom: spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[300],
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[600],
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray[100],
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[900],
    fontWeight: typography.weights.medium,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuValue: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.neutral.white,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  logoutText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.semantic.error,
  },
  appInfo: {
    alignItems: 'center',
    gap: 4,
    paddingBottom: spacing.xl,
  },
  appVersion: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[500],
    fontWeight: typography.weights.medium,
  },
  appCopyright: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.gray[400],
  },
});
