import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the appropriate icon

import { allData } from '../../../util/allData';
import { homeScreenData } from '../../../util/homeScreenData';
const MapComponent: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilterData] = useState<string[][]>([]);
  const [isFilter, setIsFilter] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState(false);
  const handleSearch = (text: string) => {
    // Remove non-numeric characters from the input
    // const numericText = text.replace(/[^0-9]/g, '');
    // Check if the numericText is not empty
    // if (numericText.length === 5) {
    //   // Add hyphens after the 5th characters
    //   const formattedText = numericText.slice(0, 5) + ' - ';
    //   setSearchText(formattedText);
    // } else if (numericText.length === 12) {
    //   // Add hyphens after the 5th and 12th characters
    //   const formattedText =
    //     numericText.slice(0, 5) + ' - ' + numericText.slice(5, 12) + ' - ' + numericText.slice(12);

    //   setSearchText(formattedText);
    // } else {
    //   setSearchText(text);
    // }
    setSearchText(text);
    console.log('The searchtext value is:', searchText);
    // Filter data based on complete matches
    const filteredData = allData.filter((item) => {
      // Check if the searchText is present in any value of the current item
      const isMatch = item.some((element) => element === text);
      return isMatch;
    });
    console.log('THe match data is:', filteredData);
    setShowClearIcon(text.length > 0);
    setIsFilter(true);
    setFilterData(filteredData);
  };

  const clearSearch = () => {
    setSearchText('');
    setIsFilter(false);
    setShowClearIcon(false);
  };
  // console.log('The data in the state is:', filterData);

  interface Item {
    gharanaNo: string;
    salsalaNo: string;
    identityCardNo: string;
  }
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for Gharana no..."
          value={searchText}
          onChangeText={handleSearch}
        />
        {showClearIcon && (
          <TouchableOpacity style={styles.clearIconContainer} onPress={clearSearch}>
            <Icon name="times" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={isFilter ? filterData : homeScreenData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        stickyHeaderIndices={[0]}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearIconContainer: {
    position: 'absolute',
    right: 23,
    top: 17,
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
    overflow: 'hidden', //
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
