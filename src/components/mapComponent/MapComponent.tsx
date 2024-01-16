import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';

const MapComponent: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const handleSearch = (text: string) => {
    setSearchText(text);
    // Implement your search logic here using the searchText state
  };
  interface Item {
    gharanaNo: string;
    salsalaNo: string;
    identityCardNo: string;
  }
  const data: Item[] = [
    { gharanaNo: '1', salsalaNo: '22235643', identityCardNo: '5.3466E' },
    { gharanaNo: '2', salsalaNo: '22235644', identityCardNo: '5.3466E' },
    { gharanaNo: '3', salsalaNo: '22235645', identityCardNo: '5.3466E' },
    { gharanaNo: '4', salsalaNo: '22235646', identityCardNo: '5.3466E' },
    { gharanaNo: '5', salsalaNo: '22235647', identityCardNo: '5.3466E' },
    { gharanaNo: '1', salsalaNo: '22235643', identityCardNo: '5.3466E' },
    { gharanaNo: '2', salsalaNo: '22235644', identityCardNo: '5.3466E' },
    { gharanaNo: '3', salsalaNo: '22235645', identityCardNo: '5.3466E' },
    { gharanaNo: '4', salsalaNo: '22235646', identityCardNo: '5.3466E' },
    { gharanaNo: '5', salsalaNo: '22235647', identityCardNo: '5.3466E' },
    { gharanaNo: '1', salsalaNo: '22235643', identityCardNo: '5.3466E' },
    { gharanaNo: '2', salsalaNo: '22235644', identityCardNo: '5.3466E' },
    { gharanaNo: '3', salsalaNo: '22235645', identityCardNo: '5.3466E' },
    { gharanaNo: '4', salsalaNo: '22235646', identityCardNo: '5.3466E' },
    { gharanaNo: '5', salsalaNo: '22235647', identityCardNo: '5.3466E' },
    { gharanaNo: '1', salsalaNo: '22235643', identityCardNo: '5.3466E' },
    { gharanaNo: '2', salsalaNo: '22235644', identityCardNo: '5.3466E' },
    { gharanaNo: '3', salsalaNo: '22235645', identityCardNo: '5.3466E' },
    { gharanaNo: '4', salsalaNo: '22235646', identityCardNo: '5.3466E' },
    { gharanaNo: '5', salsalaNo: '22235647', identityCardNo: '5.3466E' },
    { gharanaNo: '1', salsalaNo: '22235643', identityCardNo: '5.3466E' },
    { gharanaNo: '2', salsalaNo: '22235644', identityCardNo: '5.3466E' },
    { gharanaNo: '3', salsalaNo: '22235645', identityCardNo: '5.3466E' },
    { gharanaNo: '4', salsalaNo: '22235646', identityCardNo: '5.3466E' },
    { gharanaNo: '5', salsalaNo: '22235647', identityCardNo: '5.3466E' },
  ];
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.listItem}>
      <Text> {item.gharanaNo}</Text>
      <Text>{item.salsalaNo}</Text>
      <Text>{item.identityCardNo}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Text>Gharana no</Text>
      <Text>Salsala no</Text>
      <Text>Identity card no</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for gharana no..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        ListHeaderComponent={renderHeader}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.gharanaNo}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchInput: {
    height: 40,
    width: '80%',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    fontWeight: 'bold',
  },
  flatList: {
    flex: 1,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
  },
  contentContainer: {
    paddingVertical: 8,
  },
});

export default MapComponent;
