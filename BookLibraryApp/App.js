import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/Navigation/RootNavigator';
import { BookBorrowProvider } from './src/context/BookBorrowContext';

export default function App() {
  return (
    <BookBorrowProvider>
      <RootNavigator />
    </BookBorrowProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
