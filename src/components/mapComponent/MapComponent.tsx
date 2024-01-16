import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';

const MapComponent: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const handleSearch = (text: string) => {
    setSearchText(text);
    // Implement your search logic here using the searchText state
  };
  interface Item {
    id: string;
    text: string;
  }
  const data = [
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    { id: '1', text: 'Random Text 1' },
    { id: '2', text: 'Random Text 2' },
    { id: '3', text: 'Random Text 3' },
    // Add more random text as needed
  ];
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.listItem}>
      <Text>{item.text}</Text>
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
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
