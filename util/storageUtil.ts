import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCredentialsFromStorage = async () => {
  try {
    const storedEmailString = await AsyncStorage.getItem('email');
    const storedPasswordString = await AsyncStorage.getItem('password');

    const storedEmail = storedEmailString ? JSON.parse(storedEmailString) : null;
    const storedPassword = storedPasswordString ? JSON.parse(storedPasswordString) : null;

    return { email: storedEmail, password: storedPassword };
  } catch (error) {
    console.error('Error retrieving credentials from storage:', error);
    return { email: null, password: null };
  }
};
