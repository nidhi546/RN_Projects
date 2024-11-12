import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AdminDashBord from '../../Screens/Admin/AdminDashBord';
import AdminProfileScreen from '../../Screens/Admin/AdminProfileScreen';
import fonts from '../../Utils/fonts';

const Drawer = createDrawerNavigator();

const AdminStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="AdminDashBord"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          width: '70%',
          flex: 1,
        },
        drawerActiveBackgroundColor: 'lightblue',
        drawerInactiveBackgroundColor: 'white',
        drawerItemStyle: {
          borderRadius: 12,
          fontFamily:fonts.medium,
        },
         drawerLabelStyle: {
          fontSize: 16,
          fontFamily:fonts.medium
        },
      }}>
      <Drawer.Screen
        name="AdminDashBord"
        component={AdminDashBord}
        options={{
          headerShown: true,
          title: 'Dashboard',
          headerTitleStyle: {
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
            fontFamily: fonts.medium,
          },
        }}
      />
      <Drawer.Screen
        name="AdminProfileScreen"
        component={AdminProfileScreen}
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleStyle: {
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
            fontFamily: fonts.medium,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminStack;
