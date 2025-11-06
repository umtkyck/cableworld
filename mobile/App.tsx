import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { StripeProvider } from '@stripe/stripe-react-native';
import Navigation from './src/navigation';
import './src/services/notifications'; // Initialize notifications
import paymentService from './src/services/payment';

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE';

export default function App() {
  useEffect(() => {
    // Initialize payment service
    paymentService.initialize().catch(console.error);
  }, []);

  return (
    <SafeAreaProvider>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <Navigation />
      </StripeProvider>
    </SafeAreaProvider>
  );
}
