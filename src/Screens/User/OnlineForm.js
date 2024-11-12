import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import fonts from '../../Utils/fonts';

const BankingForm = () => {
  // Form State Variables
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accountType, setAccountType] = useState('Savings');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [branchName, setBranchName] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('Single');

  // Date of Birth Picker Handler
  const handleDobChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDobPicker(false);
    setDob(currentDate);
  };

  // Submit Form Handler
  const handleSubmit = () => {
    Alert.alert("Form Submitted", "Your application has been submitted successfully!");
    // Add form validation and submission logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Personal Information */}
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Date of Birth */}
      <Text style={styles.label}>Date of Birth</Text>
      <Button title="Select Date" onPress={() => setShowDobPicker(true)} />
      {showDobPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={handleDobChange}
        />
      )}

      {/* Bank Account Information */}
      <Text style={styles.sectionTitle}>Bank Account Information</Text>
      <Picker
        selectedValue={accountType}
        onValueChange={(itemValue) => setAccountType(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Savings" value="Savings" />
        <Picker.Item label="Checking" value="Checking" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Account Number"
        keyboardType="numeric"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="IFSC Code"
        value={ifscCode}
        onChangeText={setIfscCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Branch Name"
        value={branchName}
        onChangeText={setBranchName}
      />
      <TextInput
        style={styles.input}
        placeholder="Initial Deposit Amount"
        keyboardType="numeric"
        value={initialDeposit}
        onChangeText={setInitialDeposit}
      />

      {/* Identification Details */}
      <Text style={styles.sectionTitle}>Identification Details</Text>
      <TextInput
        style={styles.input}
        placeholder="National ID / PAN Card Number"
        value={idNumber}
        onChangeText={setIdNumber}
      />

      {/* Additional Information */}
      <Text style={styles.sectionTitle}>Additional Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />
      <TextInput
        style={styles.input}
        placeholder="Annual Income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />
      
      {/* Marital Status */}
      <Text style={styles.label}>Marital Status</Text>
      <RadioButton.Group onValueChange={(value) => setMaritalStatus(value)} value={maritalStatus}>
        <View style={styles.radioButtonContainer}>
          <RadioButton value="Single" />
          <Text>Single</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton value="Married" />
          <Text>Married</Text>
        </View>
      </RadioButton.Group>

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontFamily:fonts.medium
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default BankingForm;
