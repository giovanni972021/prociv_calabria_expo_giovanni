import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authUtils } from '../utils/auth';
import { CONFIG } from '../constants/config';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const authenticated = await authUtils.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const user = await authUtils.getUserData();
        setUserData(user);
      }
    } catch (error) {
      console.error('Errore caricamento dati utente:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Conferma logout',
      'Sei sicuro di voler uscire dall\'applicazione?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Esci',
          style: 'destructive',
          onPress: async () => {
            await authUtils.clearAuthData();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          },
        },
      ]
    );
  };

  const openExternalLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Errore', 'Impossibile aprire il link');
      }
    } catch (error) {
      console.error('Errore apertura link:', error);
      Alert.alert('Errore', 'Impossibile aprire il link');
    }
  };

  const getProfileIcon = (profile) => {
    if (profile.includes('Admin')) return 'shield';
    if (profile.includes('Chief')) return 'star';
    if (profile.includes('Citizen')) return 'person';
    return 'people';
  };

  const formatProfileName = (profile) => {
    return profile.replace('Profile:', '').replace(/([A-Z])/g, ' $1').trim();
  };

  const menuItems = [
    {
      id: 'region',
      title: 'Sito Regione Calabria',
      subtitle: 'Visita il sito ufficiale',
      icon: 'globe-outline',
      action: () => openExternalLink(CONFIG.EXTERNAL_URLS.REGION_WEBSITE),
    },
    {
      id: 'privacy',
      title: 'Informativa Privacy',
      subtitle: 'Consulta la privacy policy',
      icon: 'shield-outline',
      action: () => openExternalLink(CONFIG.EXTERNAL_URLS.PRIVACY_POLICY),
    },
    {
      id: 'contacts',
      title: 'Contatti',
      subtitle: 'Informazioni di contatto',
      icon: 'call-outline',
      action: () => openExternalLink(CONFIG.EXTERNAL_URLS.CONTACTS),
    },
    {
      id: 'info',
      title: 'Informazioni App',
      subtitle: 'Versione e dettagli tecnici',
      icon: 'information-circle-outline',
      action: () => showAppInfo(),
    },
  ];

  const showAppInfo = () => {
    Alert.alert(
      'Informazioni App',
      `Protezione Civile Calabria
      
Versione: 1.0.0
Sviluppata con: React Native + Expo
Ambiente: ${CONFIG.ENVIRONMENT}

© 2024 Regione Calabria
Dipartimento Protezione Civile`,
      [{ text: 'OK' }]
    );
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.anonymousContainer}>
          <Ionicons name="person-outline" size={80} color="#ccc" />
          <Text style={styles.anonymousTitle}>Modalità Anonima</Text>
          <Text style={styles.anonymousText}>
            Stai utilizzando l'app in modalità anonima.
            Effettua il login per accedere al tuo profilo.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Ionicons name="log-in" size={20} color="#fff" />
            <Text style={styles.loginButtonText}>Accedi</Text>
          </TouchableOpacity>
        </View>

        {/* Menu items available for anonymous users */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Informazioni</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemIcon}>
                <Ionicons name={item.icon} size={24} color="#FF6B35" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <Ionicons name="person" size={40} color="#FF6B35" />
          </View>
          <Text style={styles.userName}>{userData?.name || 'Utente'}</Text>
          <Text style={styles.userEmail}>{userData?.registrationEmail || ''}</Text>
        </View>

        {/* User Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dati Utente</Text>
          <View style={styles.dataCard}>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Nome Utente</Text>
              <Text style={styles.dataValue}>{userData?.name || 'N/D'}</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Email</Text>
              <Text style={styles.dataValue}>{userData?.registrationEmail || 'N/D'}</Text>
            </View>
          </View>
        </View>

        {/* Active Profiles Section */}
        {userData?.profiles && userData.profiles.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profili Attivi</Text>
            <View style={styles.profilesContainer}>
              {userData.profiles.map((profile, index) => (
                <View key={index} style={styles.profileBadge}>
                  <Ionicons
                    name={getProfileIcon(profile)}
                    size={16}
                    color="#FF6B35"
                  />
                  <Text style={styles.profileText}>
                    {formatProfileName(profile)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Menu Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemIcon}>
                <Ionicons name={item.icon} size={24} color="#FF6B35" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#FF3B30" />
            <Text style={styles.logoutButtonText}>Esci dall'app</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  dataCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dataItem: {
    marginBottom: 15,
  },
  dataLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  profilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6B35',
    gap: 6,
  },
  profileText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B30',
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  anonymousContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  anonymousTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  anonymousText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
});

