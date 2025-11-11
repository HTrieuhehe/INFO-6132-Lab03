import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BookListScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Book List Screen</Text>
      <Button
        title="Go to Book Detail"
        onPress={() => navigation.navigate("BookDetail")}
      />
      <Button
        title="Go to Borrowed Books"
        onPress={() => navigation.navigate("BorrowedBooks")}
      />
    </View>
  );
}
