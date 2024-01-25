import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        <Text style={styles.headerText}>PB 2 Zhob</Text>
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
    justifyContent: 'center', // Adjust as needed
    alignItems: 'center',
    paddingHorizontal: 10, // Add padding for better spacing
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
    justifyContent: 'space-between', // Adjust as needed
    alignItems: 'center',
    paddingHorizontal: 10, // Add padding for better spacing
  },
});

export default Header;
