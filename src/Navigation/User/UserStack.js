import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserDashbord from '../../Screens/User/UserDashbord';
import UserProfileScreen from '../../Screens/User/UserProfileScreen';
import fonts from '../../Utils/fonts';
import {Image} from 'react-native';
import images from '../../Utils/images';

const Tab = createBottomTabNavigator();

const UserStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          paddingBottom: 5,
          height: 60,
          fontFamily: fonts.medium,
        },
        tabBarLabelStyle: {fontFamily: fonts.medium, fontSize: 12},
        tabBarActiveTintColor: 'skyblue',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="UserDashbord"
        component={UserDashbord}
        options={{
          headerShown: true,
          title: 'Home',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
            fontFamily: fonts.medium,
          },
          tabBarIcon: ({focused}) => (
            <Image
              source={images.home}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? 'skyblue' : 'gray',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <Image
              source={images.user}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? 'skyblue' : 'gray',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserStack;
