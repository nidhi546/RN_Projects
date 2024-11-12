// CustomTextInput.js
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import fonts from '../Utils/fonts';
import {Text} from 'react-native';
import images from '../Utils/images';

const CustomTextInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showPassword,
  toggleShowPassword,
  keyboardType,
  iconstyle,
}) => {
  return (
    <View style={styles.inputWrapper}>
      {iconName && (
        <View>
          <Image source={iconName} resizeMode="contain" style={iconstyle} />
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {toggleShowPassword && (
        <TouchableOpacity onPress={toggleShowPassword}>
          <Image
            source={showPassword ? images.eye : images.hidden}
            style={{height: 20, width: 20, tintColor: 'gray'}}
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.regular,
  },
});

export default CustomTextInput;
