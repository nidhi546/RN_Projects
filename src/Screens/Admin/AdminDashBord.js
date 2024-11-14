import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Animated,
  StatusBar,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import images from '../../Utils/images';
import fonts from '../../Utils/fonts';

const AdminDashBord = ({navigation}) => {
  const [data, setdata] = useState();
  // console.log(data);

  useEffect(() => {
    retrieveFormData();
  }, []);
  const retrieveFormData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@form_data');
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        // console.log('Retrieved Form Data:', data);
        setdata(data);
        // Use the data as needed
      } else {
        console.log('No data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving form data:', error);
    }
  };

  const openDialer = mobileno => {
    if (mobileno) {
      Linking.openURL(`tel:${mobileno}`);
    }
  };

  const openWhatsApp = mobileno => {
    if (mobileno) {
      // console.log(data.phone);

      const phoneNumber = mobileno;
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
      Linking.openURL(whatsappUrl)
        .then(supported => {
          // console.log(supported);

          if (supported) {
            Linking.openURL(whatsappUrl);
          } else {
            alert('WhatsApp is not installed on your device.');
          }
        })
        .catch(err => console.error('An error occurred', err));
    }
  };

  const openEmail = mail => {
    if (mail) {
      Linking.openURL(`mailto:${mail}`);
    }
  };

  const renderitem = ({item}) => {
    return (
      <View>
        <Pressable
          style={styles.elevationView}
          onPress={() => {
            console.log(item);
            navigation.navigate('MainStack', {
              screen: 'DetailScreen',
              params: {item},
            });
          }}>
          <View style={styles.rowcontainer}>
            <View>
              <Image
                source={images.profile}
                style={{height: 50, width: 50}}
                resizeMode="contain"
                // tintColor={'gray'}
              />
            </View>
            <View style={{marginStart: 20}}>
              <Text style={styles.nameText}>
                {`${item?.fullName} - ${item?.occupation}`}
              </Text>
              {/* <Text style={styles.semiTitle}>{data?.accountNumber}</Text> */}
              <Pressable
                onPress={() => {
                  Alert.alert(
                    'Choose Action',
                    'Do you want to dial or open WhatsApp?',
                    [
                      {text: 'Dial', onPress: openDialer(item?.phone)},
                      {text: 'WhatsApp', onPress: openWhatsApp(item?.phone)},
                      {text: 'Cancel', style: 'cancel'},
                    ],
                  );
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                  marginTop: 5,
                }}>
                <Image
                  source={images.phone}
                  style={{height: 18, width: 18}}
                  resizeMode="contain"
                />
                <Text style={[styles.semiTitle, {marginStart: 4}]}>
                  {item?.phone}
                </Text>
              </Pressable>

              {/* Pressable for Email */}
              <Pressable
                onPress={() => openEmail(item?.email)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Image
                  source={images.E_mail}
                  style={{height: 18, width: 18}}
                  resizeMode="contain"
                />
                <Text style={[styles.semiTitle, {marginStart: 4}]}>
                  {item?.email}
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeareaView}>
      <View style={{paddingHorizontal: 10}}>
        <View>
          <FlatList
            contentContainerStyle={{marginBottom: 20, paddingHorizontal: 8}}
            data={data}
            renderItem={renderitem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  elevationView: {
    backgroundColor: 'white',
    elevation: 4,
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
    // borderWidth:1,
    // borderColor:"lightgray"
  },
  rowcontainer: {
    flexDirection: 'row',
    //  alignItems: 'center'
  },
  nameText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: 'black',
  },
  semiTitle: {
    fontFamily: fonts.regular,
    color: 'gray',
    fontSize: 12,
  },
});
export default AdminDashBord;
