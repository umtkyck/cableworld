import { initStripe, confirmPayment, PaymentIntent } from '@stripe/stripe-react-native';
import apiService from './api';

class PaymentService {
  private initialized = false;

  /**
   * Initialize Stripe with publishable key
   * Call this in App.tsx on startup
   */
  async initialize() {
    if (this.initialized) return;

    try {
      await initStripe({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE',
        merchantIdentifier: 'merchant.com.cableworld',
        urlScheme: 'cableworld',
      });
      this.initialized = true;
      console.log('Stripe initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      throw error;
    }
  }

  /**
   * Create payment intent on backend and return client secret
   */
  async createPaymentIntent(params: {
    amount: number;
    quoteId: string;
    customerEmail?: string;
    customerName?: string;
  }): Promise<{ clientSecret: string; paymentIntentId: string }> {
    try {
      const response = await apiService.post('/payment/create-intent', params);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create payment intent:', error);
      throw new Error(error.response?.data?.message || 'Failed to create payment intent');
    }
  }

  /**
   * Process payment using Stripe SDK
   */
  async processPayment(params: {
    clientSecret: string;
    billingDetails?: {
      email?: string;
      name?: string;
      phone?: string;
      address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
      };
    };
  }): Promise<{ success: boolean; paymentIntent?: PaymentIntent; error?: string }> {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      const { paymentIntent, error } = await confirmPayment(params.clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: params.billingDetails,
        },
      });

      if (error) {
        console.error('Payment failed:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      if (paymentIntent) {
        console.log('Payment successful:', paymentIntent.id);
        return {
          success: true,
          paymentIntent,
        };
      }

      return {
        success: false,
        error: 'Unknown error occurred',
      };
    } catch (error: any) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: error.message || 'Payment processing failed',
      };
    }
  }

  /**
   * Format amount for display
   */
  formatAmount(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }
}

export default new PaymentService();
