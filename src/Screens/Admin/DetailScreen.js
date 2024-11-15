import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import fonts from '../../Utils/fonts';

const DetailScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [pin, setPin] = useState('');
  const correctPin = '1234';
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometryType, setBiometryType] = useState(null);

  useEffect(() => {
    // Check for biometric support on component mount
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics
      .isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;

        if (available) {
          setBiometricSupported(true);
          setBiometryType(biometryType);
        } else {
          setBiometricSupported(false);
          setBiometryType(null);
        }
      })
      .catch((error) => {
        console.error('Error checking biometric availability:', error);
        setBiometricSupported(false);
      });
  }, []);

  useEffect(() => {
    // Trigger biometric authentication whenever the modal becomes visible
    if (isModalVisible && biometricSupported) {
      handleAuthentication();
    }
  }, [isModalVisible, biometricSupported]);

  const handleAuthentication = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics
      .simplePrompt({ promptMessage: 'Authenticate with biometrics' })
      .then((result) => {
        const { success } = result;

        if (success) {
         console.log('Authentication Successful', 'You have been authenticated!');
          setIsModalVisible(false); // Close modal after successful fingerprint authentication
        } else {
        console.log('Authentication Failed', 'Please enter the PIN to proceed.');
        }
      })
      .catch((error) => {
        console.error('Biometric authentication error:', error);
      });
  };

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setIsModalVisible(false); // Close the modal if PIN is correct
    } else {
      Alert.alert('Incorrect PIN', 'Please enter the correct PIN.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('PIN Required', 'Please enter the correct PIN to proceed.');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* {biometricSupported && (
              <Text style={styles.modalTitle}>
                {`Biometric Authentication Available (${biometryType})`}
              </Text>
            )} */}
            <Text style={styles.modalTitle}>Enter PIN to Access</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter PIN"
              secureTextEntry={true}
              keyboardType="numeric"
              value={pin}
              onChangeText={(text) => setPin(text)}
            />
            <Pressable onPress={handlePinSubmit} style={styles.submitButton}>
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {!isModalVisible && (
        <ScrollView
          contentContainerStyle={styles.detailsContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.headerText}>Account Holder Information</Text>
            <View
              style={[
                styles.accountTypeBadge,
                {
                  backgroundColor:
                    item?.accountType === 'Current'
                      ? '#5072A7'
                      : item?.accountType === 'Saving'
                      ? '#008000'
                      : item?.accountType === 'Checking'
                      ? '#5F9EA0'
                      : 'grey',
                },
              ]}
            >
              <Text
                style={styles.accountTypeText}
              >{`${item?.accountType} Account`}</Text>
            </View>
          </View>

          <View style={styles.detailSection}>
            <DetailRow icon="account-circle" label="Account Number" value={item?.accountNumber} />
            <DetailRow icon="person" label="Full Name" value={item?.fullName} />
            <DetailRow icon="business" label="Branch Name" value={item?.branchName} />
            <DetailRow icon="calendar-today" label="Date of Birth" value={item?.dob} />
            <DetailRow icon="email" label="Email" value={item?.email} />
            <DetailRow icon="credit-card" label="ID Number" value={item?.idNumber} />
            <DetailRow icon="account-balance" label="IFSC Code" value={item?.ifscCode} />
            <DetailRow icon="attach-money" label="Income" value={item?.income} />
            <DetailRow icon="payment" label="Initial Deposit" value={item?.initialDeposit} />
            <DetailRow icon="people" label="Marital Status" value={item?.maritalStatus} />
            <DetailRow icon="work" label="Occupation" value={item?.occupation} />
            <DetailRow icon="phone" label="Phone" value={item?.phone} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailTextContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.valueText}>{value || '-'}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0F2',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    fontFamily:fonts.semibold
  },
  input: {
    width: '100%',
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily:fonts.medium
  },
  submitButton: {
    backgroundColor: '#4F8EF7',
    width: '50%',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 10,
  },
  submitText: {
    fontSize: 14,
    color: 'white',
    fontFamily:fonts.medium
  },
  detailsContainer: {
    padding: 20,
  },
  infoContainer: {
    backgroundColor: 'white',
    elevation: 4,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.semibold,
  },
  accountTypeBadge: {
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  accountTypeText: {
    color: 'white',
    fontFamily: fonts.medium,
  },
  detailSection: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    padding: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  detailTextContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 14,
    color: '#333',
    fontFamily: fonts.medium,
  },
  valueText: {
    fontSize: 14,
    color: '#555',
    fontFamily: fonts.regular,
  },
});


export default DetailScreen;
