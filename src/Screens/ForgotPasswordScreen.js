import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmsRetriever from 'react-native-sms-retriever'; // Import SmsRetriever
import fonts from '../Utils/fonts';

const OTPInput = ({ length = 6, otpValue, setOtpValue }) => {
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
    <View style={styles.container}>
      {otpValue.map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          ref={(ref) => (inputs.current[index] = ref)}
          value={otpValue[index]}
        />
      ))}
    </View>
  );
};

const App = () => {
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

  const extractOTPFromMessage = (message) => {
    // Adjust the regex pattern according to your OTP SMS format
    const otpRegex = /\d{6}/; // Match a 6-digit OTP
    const match = message.match(otpRegex);
    return match ? match[0] : '';
  };

  const autofillOTP = (otp) => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8F0F2' }}>
      <View style={styles.otpView}>
        <Text style={styles.enterText}>Enter OTP:</Text>
        <OTPInput length={6} otpValue={otpValue} setOtpValue={setOtpValue} />
        <TouchableOpacity
          style={styles.submitButtonView}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Submit OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    width: 45,
    height: 45,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.medium,
  },
  submitButtonView: {
    backgroundColor: '#29AB87',
    borderRadius: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    padding: 4,
  },
  submitText: {
    fontFamily: fonts.medium,
    color: 'white',
    fontSize: 16,
    padding: 8,
  },
  otpView: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterText: {
    fontFamily: fonts.semibold,
    color: 'gray',
    fontSize: 16,
  },
});

export default App;
