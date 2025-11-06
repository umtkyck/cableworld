import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api.cableworld.com'; // Replace with actual API URL

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle errors
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, logout
          await AsyncStorage.removeItem('auth_token');
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', {email, password});
    await AsyncStorage.setItem('auth_token', response.data.token);
    return response.data;
  }

  async signup(name: string, email: string, password: string, company?: string) {
    const response = await this.api.post('/auth/signup', {name, email, password, company});
    await AsyncStorage.setItem('auth_token', response.data.token);
    return response.data;
  }

  async logout() {
    await AsyncStorage.removeItem('auth_token');
  }

  // Quotes
  async uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.api.post('/quotes/upload', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response.data;
  }

  async getQuote(quoteId: string) {
    const response = await this.api.get(`/quotes/${quoteId}`);
    return response.data;
  }

  async acceptQuote(quoteId: string) {
    const response = await this.api.post(`/quotes/${quoteId}/accept`);
    return response.data;
  }

  // Orders
  async getOrders() {
    const response = await this.api.get('/orders');
    return response.data;
  }

  async getOrderDetails(orderId: string) {
    const response = await this.api.get(`/orders/${orderId}`);
    return response.data;
  }

  async trackOrder(orderId: string) {
    const response = await this.api.get(`/orders/${orderId}/tracking`);
    return response.data;
  }

  // User
  async getProfile() {
    const response = await this.api.get('/user/profile');
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await this.api.put('/user/profile', data);
    return response.data;
  }
}

export default new APIService();
