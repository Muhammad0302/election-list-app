import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Spottroop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#1b1d1f',
    flexDirection: 'row',
    justifyContent: 'center', // To center the content horizontally within the header
    alignItems: 'center', // To center the text vertically within the header
  },
  headerText: {
    color: '#f7f8f9',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Header;
