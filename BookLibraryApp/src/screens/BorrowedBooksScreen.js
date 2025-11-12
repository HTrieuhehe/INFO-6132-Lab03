import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useBorrow } from "../context/BookBorrowContext";

export default function BorrowedBooksScreen() {
  const { borrowedBooks, loadingBorrowed, returnBook } = useBorrow();

  const handleReturn = (id, title) => {
    returnBook(id);
  };

  if (loadingBorrowed) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Loading borrowed books...</Text>
      </View>
    );
  }

  if (borrowedBooks.length === 0) {
    return (
      <View style={styles.center}>
        <Text>You have not borrowed any books yet.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      {item.category && <Text style={styles.category}>{item.category}</Text>}
      <View style={{ marginTop: 8 }}>
        <Button
          title="Return this book"
          onPress={() => handleReturn(item.id, item.title)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#555",
  },
  category: {
    marginTop: 4,
    fontSize: 12,
    color: "#888",
  },
});
