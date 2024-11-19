import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import fonts from '../../Utils/fonts';

const UserProfile = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>johndoe@gmail.com</Text>
        </View>

        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.accountDetails}>
            <Text style={styles.label}>Account Number:</Text>
            <Text style={styles.value}>123456789012</Text>
          </View>
          <View style={styles.accountDetails}>
            <Text style={styles.label}>Account Type:</Text>
            <Text style={styles.value}>Savings</Text>
          </View>
          <View style={styles.accountDetails}>
            <Text style={styles.label}>Available Balance:</Text>
            <Text style={styles.value}>₹1,25,000</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>💰 Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>📤 Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionText}>💳 Pay Bills</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Transaction History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Transfer Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Manage Beneficiaries</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  accountSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    fontFamily: fonts.semibold,
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
    fontFamily: fonts.regular,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontFamily: fonts.medium,
  },
  actions: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:fonts.semibold
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  quickActionButton: {
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    // width: 100,
    backgroundColor: 'lightgray',
    // backgroundColor: "#292929"
  },
  quickActionText: {
    fontSize: 14,
    fontFamily:fonts.medium
  },
});

export default UserProfile;
