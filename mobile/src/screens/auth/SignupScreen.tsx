import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigation/index';
import {colors, spacing, typography, borderRadius, shadows} from '@/theme';
import Icon from 'react-native-vector-icons/Feather';

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};

export default function SignupScreen({navigation}: SignupScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignup = () => {
    console.log('Signup:', {name, email, password, company});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutral.white} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">

        {/* Header */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.neutral.gray[700]} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join thousands of engineers using CableWorld
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="user"
                size={20}
                color={colors.neutral.gray[400]}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor={colors.neutral.gray[400]}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company (Optional)</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="briefcase"
                size={20}
                color={colors.neutral.gray[400]}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Your Company"
                placeholderTextColor={colors.neutral.gray[400]}
                value={company}
                onChangeText={setCompany}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="mail"
                size={20}
                color={colors.neutral.gray[400]}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={colors.neutral.gray[400]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Icon
                name="lock"
                size={20}
                color={colors.neutral.gray[400]}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Create a strong password"
                placeholderTextColor={colors.neutral.gray[400]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}>
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.neutral.gray[400]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Requirements */}
          <View style={styles.passwordRequirements}>
            <View style={styles.requirementRow}>
              <Icon name="check-circle" size={16} color={colors.accent.green} />
              <Text style={styles.requirementText}>At least 8 characters</Text>
            </View>
            <View style={styles.requirementRow}>
              <Icon name="check-circle" size={16} color={colors.neutral.gray[300]} />
              <Text style={styles.requirementText}>One uppercase letter</Text>
            </View>
            <View style={styles.requirementRow}>
              <Icon name="check-circle" size={16} color={colors.neutral.gray[300]} />
              <Text style={styles.requirementText}>One number</Text>
            </View>
          </View>

          {/* Terms Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreeTerms(!agreeTerms)}>
            <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
              {agreeTerms && <Icon name="check" size={16} color={colors.neutral.white} />}
            </View>
            <Text style={styles.checkboxText}>
              I agree to the{' '}
              <Text style={styles.link}>Terms of Service</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signupButton, !agreeTerms && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={!agreeTerms}
            activeOpacity={0.8}>
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Signup */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="smartphone" size={20} color={colors.neutral.gray[700]} />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="mail" size={20} color={colors.neutral.gray[700]} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign In Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral.gray[900],
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  form: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[700],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.gray[50],
    borderWidth: 1,
    borderColor: colors.neutral.gray[200],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[900],
  },
  eyeIcon: {
    padding: spacing.sm,
  },
  passwordRequirements: {
    gap: spacing.xs,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  requirementText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.neutral.gray[300],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.accent.green,
    borderColor: colors.accent.green,
  },
  checkboxText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[600],
    lineHeight: 20,
  },
  link: {
    color: colors.accent.green,
    fontWeight: typography.weights.semibold,
  },
  signupButton: {
    backgroundColor: colors.accent.green,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  signupButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral.white,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral.gray[200],
  },
  dividerText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral.gray[500],
  },
  socialButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.gray[200],
    borderRadius: borderRadius.lg,
  },
  socialButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.neutral.gray[700],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  footerText: {
    fontSize: typography.sizes.base,
    color: colors.neutral.gray[600],
  },
  signInLink: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.accent.green,
  },
});
