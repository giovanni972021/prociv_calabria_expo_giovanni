import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { authService } from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fiscalCode: '',
    screenName: '',
    email: '',
    phoneNumber: '',
    birthDate: new Date(),
    password: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      updateFormData('birthDate', selectedDate);
    }
  };

  const verifyEmail = async () => {
    if (!formData.email.trim()) {
      Alert.alert('Errore', 'Inserisci un indirizzo email');
      return;
    }

    setLoading(true);
    try {
      await authService.verifyEmail(formData.email);
      setEmailVerified(true);
      Alert.alert(
        'Email inviata',
        'Controlla la tua casella di posta per verificare l\'email'
      );
    } catch (error) {
      console.error('Errore verifica email:', error);
      Alert.alert('Errore', 'Impossibile inviare l\'email di verifica');
    } finally {
      setLoading(false);
    }
  };

  const verifyPhone = async () => {
    if (!formData.phoneNumber.trim()) {
      Alert.alert('Errore', 'Inserisci un numero di telefono');
      return;
    }

    setLoading(true);
    try {
      await authService.verifyPhone(formData.phoneNumber);
      setPhoneVerified(true);
      Alert.alert(
        'SMS inviato',
        'Controlla i tuoi messaggi per il codice di verifica'
      );
    } catch (error) {
      console.error('Errore verifica telefono:', error);
      Alert.alert('Errore', 'Impossibile inviare l\'SMS di verifica');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    // Validazione form
    if (!formData.fiscalCode.trim() || !formData.screenName.trim() || 
        !formData.email.trim() || !formData.password.trim()) {
      Alert.alert('Errore', 'Compila tutti i campi obbligatori');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Errore', 'Le password non coincidono');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Errore', 'La password deve essere di almeno 6 caratteri');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        _id: formData.fiscalCode,
        screenName: formData.screenName,
        Type: 'Person',
        fiscalCode: formData.fiscalCode,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate.toISOString(),
        roles: ['citizen']
      };

      await authService.register(userData);
      
      Alert.alert(
        'Registrazione completata',
        'Il tuo account è stato creato con successo. Ora puoi effettuare il login.',
        [
          {
            text: 'Vai al Login',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      console.error('Errore registrazione:', error);
      Alert.alert(
        'Errore di registrazione',
        'Impossibile completare la registrazione. Riprova più tardi.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="person-add" size={60} color="#FF6B35" />
            <Text style={styles.title}>Registrati</Text>
            <Text style={styles.subtitle}>
              Crea il tuo account per accedere a tutti i servizi
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Codice Fiscale */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Codice Fiscale *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="card" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.fiscalCode}
                  onChangeText={(value) => updateFormData('fiscalCode', value)}
                  placeholder="Inserisci il tuo codice fiscale"
                  autoCapitalize="characters"
                  maxLength={16}
                />
              </View>
            </View>

            {/* Nome Utente */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Utente *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.screenName}
                  onChangeText={(value) => updateFormData('screenName', value)}
                  placeholder="Inserisci il tuo nome utente"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  placeholder="Inserisci la tua email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={verifyEmail}
                  style={styles.verifyButton}
                  disabled={loading || emailVerified}
                >
                  <Text style={[
                    styles.verifyButtonText,
                    emailVerified && styles.verifiedText
                  ]}>
                    {emailVerified ? 'Verificata' : 'Verifica'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Numero di Telefono */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Numero di Cellulare</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.phoneNumber}
                  onChangeText={(value) => updateFormData('phoneNumber', value)}
                  placeholder="+39 123 456 7890"
                  keyboardType="phone-pad"
                />
                <TouchableOpacity
                  onPress={verifyPhone}
                  style={styles.verifyButton}
                  disabled={loading || phoneVerified}
                >
                  <Text style={[
                    styles.verifyButtonText,
                    phoneVerified && styles.verifiedText
                  ]}>
                    {phoneVerified ? 'Verificato' : 'Verifica'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Data di Nascita */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data di Nascita</Text>
              <TouchableOpacity
                style={styles.inputWrapper}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar" size={20} color="#666" style={styles.inputIcon} />
                <Text style={styles.dateText}>
                  {formData.birthDate.toLocaleDateString('it-IT')}
                </Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={formData.birthDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  placeholder="Inserisci la password"
                  secureTextEntry={!showPassword}
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Conferma Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Conferma Password *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                  placeholder="Conferma la password"
                  secureTextEntry={!showConfirmPassword}
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.registerButton, loading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="person-add" size={20} color="#fff" />
                  <Text style={styles.registerButtonText}>Registrati</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Hai già un account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Accedi qui</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  verifyButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  verifiedText: {
    color: '#28a745',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
});

