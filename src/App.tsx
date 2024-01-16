import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Header from './components/header/Header';
import HeroSection from './components/heroSection/HeroSection';
import { PaperProvider } from 'react-native-paper';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <HeroSection />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
