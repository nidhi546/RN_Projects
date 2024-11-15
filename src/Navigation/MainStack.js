import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import OnlineForm from '../Screens/User/OnlineForm';
import DetailScreen from '../Screens/Admin/DetailScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="OnlineForm">
      <Stack.Screen
        name="OnlineForm"
        component={OnlineForm}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;