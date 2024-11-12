import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashStack from './src/Navigation/SplashStack';
import AuthStack from './src/Navigation/AuthStack';
import AdminStack from './src/Navigation/Admin/AdminStack';
import UserStack from './src/Navigation/User/UserStack';
import MainStack from './src/Navigation/MainStack';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashStack">
        <Stack.Screen
          name="SplashStack"
          component={SplashStack}
          options={{
            headerShown: false,
          }}

          
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminStack"
          component={AdminStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserStack"
          component={UserStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
