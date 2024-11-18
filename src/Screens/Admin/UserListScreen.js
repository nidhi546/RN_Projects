import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../../Utils/fonts';
import {useFocusEffect} from '@react-navigation/native';

const UserListScreen = ({navigation}) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userRegistrationData');
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } else {
        console.log('No data found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('AuthStack', {screen: 'LoginScreen'});
        return true; // Prevent default back button behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );
  const renderItem = ({item, index}) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.imageUrl}} style={styles.profileImage} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{item.firstName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{item.lastName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Mobile Number:</Text>
          <Text style={styles.value}>{item.mobileNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{item.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{item.dateOfBirth}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#f7f8fc', '#e2e5ec']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {userData.length > 0 ? (
          <>
            <Text style={styles.countText}>Total Users: {userData.length}</Text>
            <FlatList
              data={userData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
            />
          </>
        ) : (
          <Text style={styles.noDataText}>No user data available.</Text>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: '#333',
    marginLeft: 10,
  },
  countText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: fonts.medium,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#777',
  },
  value: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#000',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: fonts.medium,
  },
});

export default UserListScreen;
