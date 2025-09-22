import axios from 'axios';
import { getBaseUrl, CONFIG } from '../constants/config';

// Configurazione axios
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Disabilita per evitare problemi CORS
});

// Interceptor per gestire i cookie di sessione
let authSession = null;

api.interceptors.request.use((config) => {
  console.log('🚀 API Request:', {
    method: config.method?.toUpperCase(),
    url: config.baseURL + config.url,
    data: config.data,
    headers: config.headers
  });
  
  if (authSession) {
    config.headers.Cookie = `AuthSession=${authSession}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    
    // Estrai il cookie di sessione dalla risposta
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      const authCookie = setCookie.find(cookie => cookie.startsWith('AuthSession='));
      if (authCookie) {
        authSession = authCookie.split('=')[1].split(';')[0];
        console.log('🍪 Auth session saved:', authSession);
      }
    }
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method
    });
    return Promise.reject(error);
  }
);

// Servizi API
export const authService = {
  login: async (fiscalCode, password) => {
    try {
      console.log('🔐 Attempting login with:', { fiscalCode, password: '***' });
      
      const response = await api.post(CONFIG.ENDPOINTS.LOGIN, {
        name: fiscalCode,
        password: password
      });
      
      console.log('🔐 Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔐 Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('📝 Attempting registration with:', userData);
      
      const response = await api.post(CONFIG.ENDPOINTS.REGISTER, userData);
      
      console.log('📝 Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('📝 Registration error:', error);
      throw error;
    }
  },

  verifyEmail: async (email) => {
    try {
      console.log('📧 Verifying email:', email);
      
      const response = await api.post(CONFIG.ENDPOINTS.VERIFY_EMAIL, {
        email: email
      });
      
      console.log('📧 Email verification response:', response.data);
      return response.data;
    } catch (error) {
      console.error('📧 Email verification error:', error);
      throw error;
    }
  },

  verifyPhone: async (phoneNumber) => {
    try {
      console.log('📱 Verifying phone:', phoneNumber);
      
      const response = await api.post(CONFIG.ENDPOINTS.VERIFY_PHONE, {
        phoneNumber: phoneNumber
      });
      
      console.log('📱 Phone verification response:', response.data);
      return response.data;
    } catch (error) {
      console.error('📱 Phone verification error:', error);
      throw error;
    }
  }
};

export const eventsService = {
  findEvents: async (filters = {}) => {
    try {
      console.log('🔍 Finding events with filters:', filters);
      
      const response = await api.post(CONFIG.ENDPOINTS.EVENTS_FIND, filters);
      
      console.log('🔍 Events found:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔍 Find events error:', error);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      console.log('➕ Creating event:', eventData);
      
      const response = await api.post(CONFIG.ENDPOINTS.EVENTS_CREATE, eventData);
      
      console.log('➕ Event created:', response.data);
      return response.data;
    } catch (error) {
      console.error('➕ Create event error:', error);
      throw error;
    }
  },

  getEvent: async (eventId) => {
    try {
      console.log('👁️ Getting event:', eventId);
      
      const response = await api.get(`${CONFIG.ENDPOINTS.EVENTS_VIEW}/${eventId}`);
      
      console.log('👁️ Event retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('👁️ Get event error:', error);
      throw error;
    }
  },

  updateEvent: async (eventId, eventData) => {
    try {
      console.log('✏️ Updating event:', eventId, eventData);
      
      const response = await api.put(`${CONFIG.ENDPOINTS.EVENTS_UPDATE}/${eventId}`, eventData);
      
      console.log('✏️ Event updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('✏️ Update event error:', error);
      throw error;
    }
  }
};

export default api;

