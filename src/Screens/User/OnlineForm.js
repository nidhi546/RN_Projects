import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper';
import fonts from '../../Utils/fonts';
import images from '../../Utils/images';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Componets/Loader';

const BankingForm = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [dobDate, setDobDate] = useState(new Date());
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
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleDobChange = (event, selectedDate) => {
    setShowDobPicker(false);
    if (selectedDate) {
      setDobDate(selectedDate);
      const formattedDate = formatDate(selectedDate);
      setDob(formattedDate);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('UserStack', {screen: 'UserDashbord'});
        return true; 
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );
  const data = [
    {id: '1', value: 'Saving'},
    {id: '2', value: 'Cheking'},
    {id: '3', value: 'Current'},
  ];
  const handleSubmit = async () => {
    setIsLoading(true);
    if (!fullName) {
      Alert.alert('Please Enter Full Name!');
    } else if (!email) {
      Alert.alert('Please Enter Email!');
    } else if (!phone) {
      Alert.alert('Please Enter Phone Number!');
    } else if (!dob) {
      Alert.alert('Please Select Date of Birth!');
    } else if (!accountType) {
      Alert.alert('Please Select Account Type!');
    } else if (!accountNumber) {
      Alert.alert('Please Add Account Number!');
    } else if (!ifscCode) {
      Alert.alert('Please Enter IFSC Code!');
    } else if (!branchName) {
      Alert.alert('Please Enter Your Branch Name!');
    } else if (!initialDeposit) {
      Alert.alert('Please Enter Amount!');
    } else if (!idNumber) {
      Alert.alert('Please Enter Your PAN Card Number!');
    } else if (!occupation) {
      Alert.alert('Please Enter Your Occupation!');
    } else if (!income) {
      Alert.alert('Please Enter Your Annual Income!');
    } else if (!maritalStatus) {
      Alert.alert('Please Select Your Marital Status!');
    } else {
      // All validations passed, create a JSON object with form data
      const userRecords = [];
      const formData = {
        fullName: fullName,
        email: email,
        phone: phone,
        dob: dob,
        accountType: accountType,
        accountNumber: accountNumber,
        ifscCode: ifscCode,
        branchName: branchName,
        initialDeposit: initialDeposit,
        idNumber: idNumber,
        occupation: occupation,
        income: income,
        maritalStatus: maritalStatus,
      };
      userRecords.push(formData);
      console.log(userRecords);

      try {
        // Retrieve existing records from AsyncStorage
        const existingData = await AsyncStorage.getItem('@form_data');
        let userRecords = existingData ? JSON.parse(existingData) : [];

        // Define the new form data
        const formData = {
          fullName: fullName,
          email: email,
          phone: phone,
          dob: dob,
          accountType: accountType,
          accountNumber: accountNumber,
          ifscCode: ifscCode,
          branchName: branchName,
          initialDeposit: initialDeposit,
          idNumber: idNumber,
          occupation: occupation,
          income: income,
          maritalStatus: maritalStatus,
        };

        // Add the new form data to the array
        userRecords.push(formData);

        // Convert the updated array to a JSON string
        const jsonValue = JSON.stringify(userRecords);
        setIsLoading(true);
        // Store the updated array in AsyncStorage
        await AsyncStorage.setItem('@form_data', jsonValue);
        console.log('Form Data stored in AsyncStorage:', jsonValue);

        // Show success alert
        Alert.alert(
          'Form Submitted',
          'Your application has been submitted successfully!',
        );
        setTimeout(() => {
          setIsLoading(true);
          navigation.navigate('UserStack', {screen: 'UserDashboard'});
        }, 5000);
        setIsLoading(false);

        // Optionally, reset the form fields
        // setFullName('');
        // setEmail('');
        // setPhone('');
        // setDob('');
        // setAccountType('');
        // setAccountNumber('');
        // setIfscCode('');
        // setBranchName('');
        // setInitialDeposit('');
        // setIdNumber('');
        // setOccupation('');
        // setIncome('');
        // setMaritalStatus('');
      } catch (error) {
        console.error('Error storing form data:', error);
        Alert.alert('Error', 'An error occurred while saving the data.');
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {IsLoading && <Loader />}
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
        <View style={styles.dobView}>
          <TextInput
            style={{fontFamily: fonts.regular}}
            placeholder="Date of Birth"
            value={dob}
            editable={false}
          />
          <TouchableOpacity onPress={() => setShowDobPicker(true)}>
            <Image
              source={images.calendar}
              style={{height: 30, width: 30}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {showDobPicker && (
            <DateTimePicker
              value={dobDate}
              mode="date"
              display="default"
              onChange={handleDobChange}
            />
          )}
        </View>

        {/* Bank Account Information */}
        <Text style={styles.sectionTitle}>Bank Account Information</Text>

        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={{
            fontFamily: fonts.regular,
            color: 'gray',
            fontSize: 14,
          }}
          data={data}
          search={false}
          maxHeight={300}
          labelField="value"
          valueField="value"
          placeholder={'Select item'}
          searchPlaceholder="Search..."
          value={accountType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setAccountType(item.value);
            setIsFocus(false);
          }}
        />

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
        <Text style={styles.label1}>Marital Status</Text>
        <View style={{flexDirection: 'row'}}>
          <RadioButton.Group
            onValueChange={value => setMaritalStatus(value)}
            value={maritalStatus}>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="Single" />
              <Text style={{fontFamily: fonts.regular}}>Single</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="Married" />
              <Text style={{fontFamily: fonts.regular}}>Married</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.buutonView}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    fontFamily: fonts.medium,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
    fontFamily: fonts.regular,
  },
  input1: {
    // height: 40,
    borderColor: 'black',
    borderWidth: 1,
    // marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
    fontFamily: fonts.regular,
  },
  label: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: fonts.regular,
    color: 'gray',
  },
  label1: {
    fontFamily: fonts.medium,
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    // borderWidth:1
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
    fontFamily: fonts.regular,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buutonView: {
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: fonts.semibold,
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    color: 'black',
    paddingBottom: 20,
    fontSize: 20,
  },
  maskedInput: {
    borderWidth: 2,
    borderRadius: 6,
    width: '80%',
    padding: 12,
    color: 'black',
    fontSize: 20,
  },
  dobView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
});

export default BankingForm;
