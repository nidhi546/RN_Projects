import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const FingerprintExample = () => {
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometryType, setBiometryType] = useState(null); // To store the type of biometric available

  useEffect(() => {
    // Check for biometric support
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics.isSensorAvailable().then(resultObject => {
      const { available, biometryType } = resultObject;

      if (available) {
        setBiometricSupported(true);
        setBiometryType(biometryType);
      } else {
        setBiometricSupported(false);
        setBiometryType(null);
      }
    }).catch(error => {
      console.error('Error checking biometric availability:', error);
      setBiometricSupported(false);
    });
  }, []);

  const handleAuthentication = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics.simplePrompt({ promptMessage: 'Authenticate with biometrics' })
      .then(result => {
        const { success } = result;

        if (success) {
          Alert.alert(
            'Authentication Successful',
            'You have been authenticated!'
          );
        } else {
          Alert.alert(
            'Authentication Failed',
            'Biometric authentication failed.'
          );
        }
      })
      .catch(error => {
        Alert.alert(
          'Authentication Error',
          error.message || 'An error occurred during authentication.'
        );
      });
  };

  return (
    <View style={styles.container}>
      {biometricSupported ? (
        <>
          <Text style={styles.infoText}>
            {`Biometric Authentication Available (${biometryType})`}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAuthentication}
          >
            <Text style={styles.buttonText}>Authenticate</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>
          Biometric Authentication is not available on this device
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FingerprintExample;
