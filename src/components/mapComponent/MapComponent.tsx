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
  const data = [
    ['1', '22235643', '5.3466E'],
    ['2', '22235644', '5.3466E'],
    ['3', '22235645', '5.3466E'],
  ];
  const renderItem = ({ item, index }: { item: string[]; index: number }) => (
    <View style={styles.listItem}>
      <Text>{item[0]}</Text>
      <Text>{item[1]}</Text>
      <Text>{item[2]}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.headerText}>Gharana no</Text>
      <Text style={styles.headerText}>Salsala no</Text>
      <Text style={styles.headerText}>Identity card no</Text>
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
        keyExtractor={(item, index) => index.toString()}
        // keyExtractor={(item) => item.gharanaNo}
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
  headerText: {
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
