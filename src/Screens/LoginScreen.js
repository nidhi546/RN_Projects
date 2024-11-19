// LoginScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomTextInput from '../Componets/CustomTextInput';
import CustomButton from '../Componets/CustomButton';
import fonts from '../Utils/fonts';
import images from '../Utils/images';
import {userCredentials} from '../credentials/userCredentials';
import {adminCredentials} from '../credentials/adminCredentials';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Componets/Loader';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      Alert.alert('Please Enter Email !');
    } else if (!password) {
      Alert.alert('Please Enter Password !');
    } else {
      setIsLoading(true);
      let userType = null;
      const emailLower = email.toLowerCase();

      if (
        emailLower === userCredentials.email &&
        password === userCredentials.password
      ) {
        userType = 'user';
      } else if (
        emailLower === adminCredentials.email &&
        password === adminCredentials.password
      ) {
        userType = 'admin';
      }
      setIsLoading(true);
      if (userType) {
        await AsyncStorage.setItem('userType', userType);
        if (userType === 'admin') {
          navigation.navigate('AdminStack', {screen: 'AdminDashBord'});
          setIsLoading(false);
        } else {
          navigation.navigate('UserStack', {screen: 'UserDashbord'});
          setIsLoading(false);
        }
      } else {
        Alert.alert('Login failed', 'Invalid email or password');
         setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {IsLoading  && <Loader/>}
      <View style={styles.logoContainer}>
        <Image
          source={{uri: 'https://your-logo-url.com/logo.png'}}
          style={styles.logo}
        />
        <Text style={styles.title}>Login to Your Account</Text>
      </View>

      <View style={styles.inputContainer}>
        <CustomTextInput
          iconName={images.email}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text.toLowerCase())}
          keyboardType="email-address"
          iconstyle={{
            height: 20,
            width: 20,
            tintColor: 'gray',
            marginRight: 10,
          }}
        />
        <CustomTextInput
          iconName={images.padlock}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          iconstyle={{
            height: 20,
            width: 20,
            tintColor: 'gray',
            marginRight: 10,
          }}
        />
      </View>

      <CustomButton title="Sign In" onPress={handleLogin} />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() =>
          navigation.navigate('AuthStack', {screen: 'ForgotPasswordScreen'})
        }>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    color: '#333',
    fontFamily: fonts.bold,
  },
  inputContainer: {
    marginBottom: 20,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#1a73e8',
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
    fontFamily: fonts.medium,
  },
  signupButton: {
    fontSize: 14,
    color: '#1a73e8',
    fontFamily: fonts.medium,
  },
});

export default LoginScreen;
