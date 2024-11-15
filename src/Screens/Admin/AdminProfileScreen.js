import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import images from '../../Utils/images';

const FingerprintEnrollment = () => {
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [progress, setProgress] = useState(0); // 0: No fingerprints, 1: First done, 2: All done

  const rnBiometrics = new ReactNativeBiometrics();

  // Check for biometric hardware availability
  const checkBiometricAvailability = () => {
    rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        const {available, biometryType} = resultObject;

        if (available) {
          setBiometricAvailable(true);
          Alert.alert(
            'Success',
            `${biometryType} is available on this device.`,
          );
        } else {
          setBiometricAvailable(false);
          Alert.alert(
            'Error',
            'Biometric hardware is not available on this device.',
          );
        }
      })
      .catch(() => Alert.alert('Error', 'Unable to check biometric hardware.'));
  };

  // Register fingerprints
  const registerFingerprint = fingerprintNumber => {
    rnBiometrics
      .simplePrompt({
        promptMessage: `Register Fingerprint ${fingerprintNumber}`,
      })
      .then(result => {
        if (result.success) {
          setProgress(fingerprintNumber);
          Alert.alert(
            'Fingerprint Registered',
            `Fingerprint ${fingerprintNumber} registered successfully!`,
          );
        } else {
          Alert.alert('Failed', 'Fingerprint registration was cancelled.');
        }
      })
      .catch(() => Alert.alert('Error', 'Fingerprint registration failed.'));
  };

  // Confirmation after completing the enrollment
  const confirmEnrollment = () => {
    if (progress === 2) {
      Alert.alert(
        'Success',
        'Both fingerprints have been registered successfully!',
      );
    } else {
      Alert.alert(
        'Incomplete',
        'Please complete the fingerprint registration.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fingerprint Enrollment</Text>

      <TouchableOpacity
        style={styles.checkButton}
        onPress={checkBiometricAvailability}>
        <Text style={styles.checkButtonText}>Check Biometric Availability</Text>
      </TouchableOpacity>

      {biometricAvailable && (
        <View style={styles.fingerprintContainer}>
          {/* First Fingerprint Icon */}
          <TouchableOpacity
            style={[styles.fingerprintBox, progress >= 1 && styles.completed]}
            onPress={() => registerFingerprint(1)}
            disabled={progress >= 1}>
            <Image
              source={images.fingerprint} // Replace with your fingerprint icon path
              style={styles.fingerprintIcon}
              resizeMode="contain"
            />
            <Text style={styles.fingerprintText}>
              {progress >= 1 ? 'Registered' : 'Add Fingerprint 1'}
            </Text>
          </TouchableOpacity>

          {/* Second Fingerprint Icon */}
          <TouchableOpacity
            style={[styles.fingerprintBox, progress >= 2 && styles.completed]}
            onPress={() => registerFingerprint(2)}
            disabled={progress >= 2}>
            <Image
              source={images.fingerprint} // Replace with your fingerprint icon path
              style={styles.fingerprintIcon}
              resizeMode="contain"
            />
            <Text style={styles.fingerprintText}>
              {progress >= 2 ? 'Registered' : 'Add Fingerprint 2'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {progress === 2 && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmEnrollment}>
          <Text style={styles.confirmButtonText}>Confirm Enrollment</Text>
        </TouchableOpacity>
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
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  checkButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fingerprintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  fingerprintBox: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  fingerprintIcon: {
    width: 50,
    height: 50,
    tintColor: '#555',
  },
  fingerprintText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  completed: {
    backgroundColor: '#d4edda',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FingerprintEnrollment;
