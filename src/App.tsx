import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Header from './components/header/Header';
import HeroSection from './components/heroSection/HeroSection';
import { PaperProvider } from 'react-native-paper';
import Login from './components/Login/Login';
import { getCredentialsFromStorage } from '../util/storageUtil';
function App(): JSX.Element {
  const [credentials, setCredentials] = useState({ email: null, password: null });
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const fetchCredentials = async () => {
      const { email, password } = await getCredentialsFromStorage();
      setCredentials({ email, password });
    };

    fetchCredentials();
  }, [counter]);
  console.log('The credentail is:', credentials);
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {credentials.email && credentials.password ? (
          <>
            <Header setCounter={setCounter} counter={counter} />
            <HeroSection />
          </>
        ) : (
          <Login setCounter={setCounter} counter={counter} />
        )}

        {/* <Login /> */}
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
