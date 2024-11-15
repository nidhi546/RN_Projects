import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Animated,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {ImageSlider} from 'react-native-image-slider-banner';
import fonts from '../../Utils/fonts';
import images from '../../Utils/images';
import { useFocusEffect } from '@react-navigation/native';

const UserDashbord = ({navigation}) => {

   useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('AuthStack',{screen:"LoginScreen"});
        return true; // Prevent default back button behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );
  return (
    <SafeAreaView>
      <View style={{paddingHorizontal: 12}}>
        <ImageSlider
          data={[
            {
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU',
            },
            {
              img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
            },
            {
              img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
            },
          ]}
          autoPlay={true}
          //   onItemChanged={item => console.log('item', item)}
          closeIconColor="#fff"
          showIndicator={false}
        />
      </View>

      <View style={{paddingHorizontal: 12}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainStack', {screen: 'OnlineForm'})
          }
          style={{
            backgroundColor: 'white',
            elevation: 2,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontFamily: fonts.medium, color: 'gray', padding: 15}}>
            Fill Your Form & Upload Documnet
          </Text>
          <Image
            source={images.next}
            style={{height: 25, width: 25, marginEnd: 10}}
            resizeMode="contain"
            tintColor="gray"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default UserDashbord;
