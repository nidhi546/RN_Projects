import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../Utils/images';
import fonts from '../Utils/fonts';
import CustomButton from '../Componets/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Componets/Loader';

const RegisterScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    imageUrl: '', // Added field to store the image URL
  });

  const [showDobPicker, setShowDobPicker] = useState(false);
  const [isDialogVisible1, setDialogVisible1] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleDobChange = (event, selectedDate) => {
    setShowDobPicker(false);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      handleInputChange('dateOfBirth', formattedDate);
    }
  };

  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

const handleSubmit = async () => {
  const {
    firstName,
    lastName,
    mobileNumber,
    email,
    dateOfBirth,
    password,
    confirmPassword,
    imageUrl,
  } = formData;

  if (!imageUrl) {
    Alert.alert('Please upload your profile image!');
  } else if (!firstName) {
    Alert.alert('Please enter First Name!');
  } else if (!lastName) {
    Alert.alert('Please enter Last Name!');
  } else if (!mobileNumber) {
    Alert.alert('Please enter Mobile Number!');
  } else if (!email) {
    Alert.alert('Please enter Email!');
  } else if (!dateOfBirth) {
    Alert.alert('Please select Date of Birth!');
  } else if (!password) {
    Alert.alert('Please enter Password!');
  } else if (!confirmPassword) {
    Alert.alert('Please confirm your password!');
  } else if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
  } else {
    try {
      // Retrieve existing data
      const existingData = await AsyncStorage.getItem('userRegistrationData');
      let updatedData = [];

      // Check if existingData is valid and parse it into an array
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        if (Array.isArray(parsedData)) {
          updatedData = parsedData;
        } else {
          console.log('Existing data is not an array. Initializing as an empty array.');
        }
      }

      // Append new data
      updatedData.push(formData);

      // Store updated data back to AsyncStorage
      await AsyncStorage.setItem(
        'userRegistrationData',
        JSON.stringify(updatedData),
      );

      console.log('Updated Data:', updatedData);
      setisLoading(true);

      setTimeout(() => {
        setisLoading(false);
        navigation.navigate('AuthStack', {
          screen: 'LoginScreen',
        });
      }, 2000);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
      Alert.alert('Error', 'Failed to save registration data');
    }
  }
};



  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        console.log('Selected image from gallery:', image);
        setFormData({...formData, imageUrl: image.path}); // Store image URL in formData
        setDialogVisible1(false);
      })
      .catch(error => {
        console.error('ImagePicker Error:', error);
      });
  };

  const OpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log('Captured image:', image.path);
        setFormData({...formData, imageUrl: image.path}); // Store image URL in formData
        setDialogVisible1(false);
      })
      .catch(error => {
        console.error('Image capture failed:', error);
      });
  };

  const hideBottomSheet = () => {
    setDialogVisible1(false);
  };

  const showBottomSheet = () => {
    setDialogVisible1(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <View style={{paddingHorizontal: 12, margin: 6, marginBottom: 20, marginTop: 20}}>
            <View style={styles.imageContainer}>
              {formData.imageUrl ? (
                <Image
                  source={{uri: formData.imageUrl}}
                  style={styles.employeeImage}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={images.profile2}
                  style={styles.employeeImage}
                  resizeMode="cover"
                />
              )}
            </View>
            <TouchableOpacity onPress={showBottomSheet}>
              <Image
                source={images.camera5}
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: 'center',
                  bottom: 35,
                  left: 25,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={text => handleInputChange('firstName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={text => handleInputChange('lastName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={formData.mobileNumber}
              onChangeText={text => handleInputChange('mobileNumber', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={text =>
                handleInputChange('email', text.toLocaleLowerCase())
              }
            />
            <View style={styles.dobView}>
              <TextInput
                style={{fontFamily: fonts.regular, fontSize: 16}}
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => setShowDobPicker(true)}
                style={{alignItems: 'flex-end', flex: 1, marginEnd: 10}}>
                <Image
                  source={images.calendar}
                  style={{height: 30, width: 30}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {showDobPicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDobChange}
                />
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={formData.password}
              onChangeText={text => handleInputChange('password', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={formData.confirmPassword}
              onChangeText={text => handleInputChange('confirmPassword', text)}
            />

            <CustomButton title="Register" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>

        <Modal
        style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
        transparent={true}
        visible={isDialogVisible1}
        animationType="slide">
        <View
          style={{
            backgroundColor:'white',
            padding: 20,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderTopWidth: 1,
            borderColor: 'lightgray',
            elevation: 8,
          }}>
          <TouchableOpacity
            onPress={hideBottomSheet}
            style={{alignItems: 'flex-end', flex: 1, marginEnd: 20}}>
            <Image
              source={images.cancel}
              style={{height: 25, width: 25}}
              resizeMode="contain"
              tintColor={'gray'}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              margin: 15,
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => handleImagePicker()}>
              <Image
                source={images.gallery}
                style={styles.img}
                resizeMode="contain"
              />
              <Text style={styles.fonts}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => OpenCamera()}>
              <Image
                source={images.camera}
                style={styles.img}
                resizeMode="contain"
              />
              <Text style={styles.fonts}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 12,
    // alignItems:"center"
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: fonts.medium,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 8,
    borderRadius: 4,
    margin: 3,
    marginTop: 20,
    // alignItems:"center"
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    fontFamily: fonts.regular,
  },

  dobView: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },

  img: {
    height: 45,
    width: 45,
  },
  employeeImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    // tintColor: 'gray',
    // borderWidth:2
  },
  imageContainer: {
    marginBottom: 5,
    // padding: 10,
    alignSelf: 'center',
    borderRadius: 50,

    // overflow: 'hidden',
  },
  fonts: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: 'black',
  },
});

export default RegisterScreen;
