import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
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
import fonts from '../../Utils/fonts';

const DetailScreen = ({navigation, route}) => {
  const {item} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [pin, setPin] = useState('');
  const correctPin = '1234';

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
          Alert.alert(
            'PIN Required',
            'Please enter the correct PIN to proceed.',
          );
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter PIN to Access</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter PIN"
              secureTextEntry={true}
              keyboardType="numeric"
              value={pin}
              onChangeText={text => setPin(text)}
            />
            <Pressable onPress={handlePinSubmit} style={styles.submitButton}>
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {!isModalVisible && (
        <ScrollView contentContainerStyle={styles.detailsContainer}>
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
              ]}>
              <Text
                style={
                  styles.accountTypeText
                }>{`${item?.accountType} Account`}</Text>
            </View>
          </View>

          <View style={styles.detailSection}>
            <DetailRow
              icon="account-circle"
              label="Account Number"
              value={item?.accountNumber}
            />
            <DetailRow icon="person" label="Full Name" value={item?.fullName} />
            <DetailRow
              icon="business"
              label="Branch Name"
              value={item?.branchName}
            />
            <DetailRow
              icon="calendar-today"
              label="Date of Birth"
              value={item?.dob}
            />
            <DetailRow icon="email" label="Email" value={item?.email} />
            <DetailRow
              icon="credit-card"
              label="ID Number"
              value={item?.idNumber}
            />
            <DetailRow
              icon="account-balance"
              label="IFSC Code"
              value={item?.ifscCode}
            />
            <DetailRow
              icon="attach-money"
              label="Income"
              value={item?.income}
            />
            <DetailRow
              icon="payment"
              label="Initial Deposit"
              value={item?.initialDeposit}
            />
            <DetailRow
              icon="people"
              label="Marital Status"
              value={item?.maritalStatus}
            />
            <DetailRow
              icon="work"
              label="Occupation"
              value={item?.occupation}
            />
            <DetailRow icon="phone" label="Phone" value={item?.phone} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const DetailRow = ({icon, label, value}) => (
  <View style={styles.detailRow}>
    {/* <MaterialIcons name={icon} size={24} color="#4F8EF7" style={styles.icon} /> */}
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: fonts.semibold,
    color: '#333',
  },
  input: {
    width: '100%',
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  submitButton: {
    backgroundColor: '#4F8EF7',
    width: '50%',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 10,
  },
  submitText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: 'white',
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerText: {
    fontFamily: fonts.bold,
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
  },
  accountTypeBadge: {
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  accountTypeText: {
    fontFamily: fonts.medium,
    color: 'white',
  },
  detailSection: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 15,
  },
  detailTextContainer: {
    flex: 1,
  },
  labelText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: '#333',
  },
  valueText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: '#555',
  },
});

export default DetailScreen;
