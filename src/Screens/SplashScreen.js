import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';

const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  useEffect(() => {
    const fadeInAnimation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    });

    const timer = setTimeout(() => {
      navigation.navigate('AuthStack', {screen: 'LoginScreen'});
    }, 4000);

    fadeInAnimation.start();

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

     <View style={styles.firstviewcontainer}>
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
          Hello! Welcome
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  firstviewcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
  },
});
export default SplashScreen;
