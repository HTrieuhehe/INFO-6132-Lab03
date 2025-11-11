import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookListScreen from "../screens/BookListScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import BorrowedBooksScreen from "../screens/BorrowedBooksScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        <Stack.Screen
          name="BookList"
          component={BookListScreen}
          options={{ title: "Book Library" }}
        />
        <Stack.Screen
          name="BookDetail"
          component={BookDetailScreen}
          options={{ title: "Book Details" }}
        />
        <Stack.Screen
          name="BorrowedBooks"
          component={BorrowedBooksScreen}
          options={{ title: "Borrowed Books" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
