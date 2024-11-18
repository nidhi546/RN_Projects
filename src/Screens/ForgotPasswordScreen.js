import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmsRetriever from 'react-native-sms-retriever'; // Import SmsRetriever
import fonts from '../Utils/fonts';
import images from '../Utils/images';

const {width} = Dimensions.get('window');

// Local back icon image
const backIcon =images.back; 

const Header = ({onBackPress, title}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Image source={backIcon} style={styles.backIcon} />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const OTPInput = ({length = 6, otpValue, setOtpValue}) => {
  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    const updatedOtp = [...otpValue];
    updatedOtp[index] = text;
    setOtpValue(updatedOtp);

    // Move focus to the next input
    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otpValue[index]) {
      inputs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    // Autofill OTP if the length matches
    if (otpValue.join('').length === length) {
      inputs.current[length - 1].blur();
    }
  }, [otpValue]);

  return (
    <View style={styles.otpContainer}>
      {otpValue.map((_, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={text => handleChangeText(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          ref={ref => (inputs.current[index] = ref)}
          value={otpValue[index]}
          // placeholder="•"
          placeholderTextColor="#ccc"
        />
      ))}
    </View>
  );
};

const ForgotPasswordScreen = ({navigation}) => {
  const [otpValue, setOtpValue] = useState(new Array(6).fill(''));

  useEffect(() => {
    const startSmsListener = async () => {
      try {
        const registered = await SmsRetriever.startSmsRetriever();
        if (registered) {
          SmsRetriever.addSmsListener(event => {
            const otp = extractOTPFromMessage(event.message);
            autofillOTP(otp);
            SmsRetriever.removeSmsListener();
          });
        }
      } catch (error) {
        console.error('Failed to start SMS retriever', error);
      }
    };

    startSmsListener();

    // Cleanup SMS Listener on unmount
    return () => {
      SmsRetriever.removeSmsListener();
    };
  }, []);

  const extractOTPFromMessage = message => {
    // Adjust the regex pattern according to your OTP SMS format
    const otpRegex = /\d{6}/; // Match a 6-digit OTP
    const match = message.match(otpRegex);
    return match ? match[0] : '';
  };

  const autofillOTP = otp => {
    if (otp && otp.length === 6) {
      const otpArray = otp.split('');
      setOtpValue(otpArray);
    }
  };

  const handleSubmit = async () => {
    const otp = otpValue.join('');
    if (otp.length === 6) {
      try {
        await AsyncStorage.setItem('user_otp', otp);
        Alert.alert('Success', 'OTP saved to AsyncStorage');
        console.log('Stored OTP:', otp);
      } catch (error) {
        Alert.alert('Error', 'Failed to save OTP to AsyncStorage');
        console.error(error);
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid OTP');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"white"}/>
      <Header
        onBackPress={() => navigation.goBack()} // Replace with navigation or custom back logic
        title="Forgot Password"
      />
      <View style={styles.otpView}>
        <Text style={styles.enterText}>Enter OTP</Text>
        <OTPInput length={6} otpValue={otpValue} setOtpValue={setOtpValue} />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8FA',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {height: 1, width: 0},
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  otpInput: {
    width: 46,
    height: 46,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    fontFamily: fonts.medium,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {height: 1, width: 0},
  },
  otpView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flex:0.8
  },
  enterText: {
    fontFamily: fonts.semibold,
    color: '#555',
    fontSize: 18,
    marginBottom: 10,
    textDecorationLine:"underline"
  },
  submitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 5,
    marginTop: 20,
  },
  submitText: {
    fontFamily: fonts.medium,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
