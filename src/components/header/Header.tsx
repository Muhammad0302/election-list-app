import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface HeaderProps {
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  counter: number;
}
const Header = ({ setCounter, counter }: HeaderProps) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setCounter(counter + 1);
      console.log('Logout button clicked');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };
  return (
    <View style={styles.header}>
      <View style={styles.subcontainer}>
        {/* <Text style={styles.headerText}>PB 2 Zhob</Text> */}
        {/* <Image
          source={require('../../../assets/logo1.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <Image
          source={require('../../../assets/logo2.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#1b1d1f',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    color: '#f7f8f9',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoutButton: {
    color: '#f7f8f9',
    fontSize: 16,
  },
  subcontainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#1b1d1f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default Header;
