import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Header from './components/header/Header';
import MapComponent from './components/mapComponent/MapComponent';
import { PaperProvider } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomSearchBar from './components/search/CustomSearchBar';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [region, setRegion] = useState([10.139444, 54.323334]);
  const [searchQuery, setSearchQuery] = useState('');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  console.log('Searching for:', searchQuery);

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />

        {/* <CustomSearchBar
          placeholder="Search for place's"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        /> */}
        <MapComponent region={region} setRegion={setRegion} />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
