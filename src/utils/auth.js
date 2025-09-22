import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = '@auth_session';
const USER_DATA_KEY = '@user_data';

export const authUtils = {
  // Salva i dati di sessione
  saveAuthSession: async (sessionData) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Errore nel salvare la sessione:', error);
    }
  },

  // Recupera i dati di sessione
  getAuthSession: async () => {
    try {
      const sessionData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error('Errore nel recuperare la sessione:', error);
      return null;
    }
  },

  // Salva i dati utente
  saveUserData: async (userData) => {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Errore nel salvare i dati utente:', error);
    }
  },

  // Recupera i dati utente
  getUserData: async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Errore nel recuperare i dati utente:', error);
      return null;
    }
  },

  // Rimuove tutti i dati di autenticazione
  clearAuthData: async () => {
    try {
      await AsyncStorage.multiRemove([AUTH_STORAGE_KEY, USER_DATA_KEY]);
    } catch (error) {
      console.error('Errore nel rimuovere i dati di autenticazione:', error);
    }
  },

  // Verifica se l'utente è autenticato
  isAuthenticated: async () => {
    try {
      const sessionData = await authUtils.getAuthSession();
      return sessionData && sessionData.ok === true;
    } catch (error) {
      return false;
    }
  }
};

