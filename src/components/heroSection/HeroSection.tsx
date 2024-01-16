import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the appropriate icon

import { data } from '../../../util/data';
const MapComponent: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilterData] = useState<string[][]>([]);
  const [isFilter, setIsFilter] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState(false);
  const handleSearch = (text: string) => {
    setSearchText(text);
    console.log('The searchtext value is:', searchText);
    // Filter data based on complete matches
    const filteredData = data.filter((item) => {
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
  // const data = [
  //   ['1', '22235643', '5.3466E'],
  //   ['2', '22235644', '5.3466E'],
  //   ['3', '22235645', '5.3466E'],
  //   ['4', '22235646', '5.3466E'],
  //   ['5', '22235647', '5.3466E'],
  //   ['6', '22235648', '5.3466E'],
  //   ['7', '22235649', '5.3466E'],
  //   ['8', '22235650', '5.3466E'],
  //   ['9', '22235651', '5.3466E'],
  //   ['10', '22235652', '5.3466E'],
  //   ['11', '22235653', '5.3466E'],
  //   ['12', '22235654', '5.3466E'],
  //   ['13', '22235655', '5.3466E'],
  //   ['14', '22235656', '5.3466E'],
  //   ['15', '22235657', '5.3466E'],
  //   ['16', '22235658', '5.3466E'],
  //   ['17', '22235659', '5.3466E'],
  //   ['18', '22235660', '5.3466E'],
  //   ['19', '22235661', '5.3466E'],
  //   ['20', '22235662', '5.3466E'],
  // ];
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
        data={isFilter ? filterData : data}
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