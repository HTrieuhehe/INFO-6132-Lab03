import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useBorrow } from "../context/BookBorrowContext";

export default function BookDetailScreen({ route, navigation }) {
  const { book } = route.params || {};
  const { borrowedBooks, borrowBook } = useBorrow();

  if (!book) {
    return (
      <View style={styles.center}>
        <Text>No book data.</Text>
      </View>
    );
  }

  const alreadyBorrowed = borrowedBooks.some((b) => b.bookId === book.id);

  const handleBorrowPress = async () => {
    //validate already borrow or not
    if (alreadyBorrowed) {
      Alert.alert("Borrow", "You already borrowed this book.");
      return;
    }

    //validate limit
    if (borrowedBooks.length >= 3) {
      Alert.alert(
        "Limit reached",
        "You cannot borrow more than three books at a time."
      );
      return;
    }

    try {
      await borrowBook(book);
      Alert.alert("Success", "Book borrowed successfully!");
    } catch (err) {
      console.log("Borrow error:", err);
      Alert.alert("Error", "Failed to borrow . Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {book.coverUrl ? (
        <Image source={{ uri: book.coverUrl }} style={styles.cover} />
      ) : null}

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>

      {book.category && <Text style={styles.chip}>{book.category}</Text>}

      <View style={styles.metaRow}>
        {book.year && <Text style={styles.meta}>Year: {book.year}</Text>}
        {book.pages && <Text style={styles.meta}>Pages: {book.pages}</Text>}
      </View>

      {book.description && (
        <>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{book.description}</Text>
        </>
      )}

      <View style={{ marginTop: 24 }}>
        <Button
          title={alreadyBorrowed ? "Already borrowed" : "Borrow this book"}
          onPress={handleBorrowPress}
          disabled={alreadyBorrowed}
        />
      </View>

      <View style={{ marginTop: 12 }}>
        <Button
          title="Go to Borrowed Books"
          onPress={() => navigation.navigate("BorrowedBooks")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  chip: {
    alignSelf: "flex-start",
    backgroundColor: "#e3f2fd",
    color: "#1565c0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  meta: {
    fontSize: 13,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
});
