/* eslint-disable max-len */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
interface CustomSearchBarProps {
  placeholder: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  placeholder,
  searchQuery,
  setSearchQuery,
}) => {
  const handleSearchValue = async (query: string) => {
    setSearchQuery(query);
    try {
      const apiKey =
        'pk.eyJ1IjoiZmFyaGFuYTc2IiwiYSI6ImNsYnlxNWU2djBzZ3YzeG81YXhtMHRiYmcifQ.2PX7oB2ag46-Cx6ioMa3yw';
      const searchQuery = encodeURIComponent(query);
      const geocodingApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${apiKey}`;
      const response = await fetch(geocodingApiUrl);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const firstFeature = data.features[0];
        const { center } = firstFeature.geometry;
      } else {
        console.log('No results found for the search.');
      }
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  };
  const handleSearch = () => {
    console.log('The onIcon press clicked');
  };

  console.log(searchQuery);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={handleSearchValue}
        icon={() => <Icon name="arrowLeft" size={20} color="#000" />}
        style={{
          height: 55,
          borderRadius: 25,
          borderWidth: 1
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default CustomSearchBar;
