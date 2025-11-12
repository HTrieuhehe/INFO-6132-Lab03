import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const BookBorrowContext = createContext();

export function BookBorrowProvider({ children }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loadingBorrowed, setLoadingBorrowed] = useState(true);

  // Load borrowed 
  useEffect(() => {
    const loadBorrowed = async () => {
      try {
        const snapshot = await getDocs(collection(db, "borrowedBooks"));
        const list = snapshot.docs.map((d) => ({
          id: d.id,         
          ...d.data(),       
        }));
        setBorrowedBooks(list);
      } catch (err) {
        console.log("Error loading borrowed books:", err);
      } finally {
        setLoadingBorrowed(false);
      }
    };

    loadBorrowed();
  }, []);

  //add
  const borrowBook = async (book) => {
    const docRef = await addDoc(collection(db, "borrowedBooks"), {
      bookId: book.id,
      ...book,
    });

    setBorrowedBooks((prev) => [...prev, { id: docRef.id, bookId: book.id, ...book }]);
  };

  //remove
  const returnBook = async (borrowedId) => {
    try {
      await deleteDoc(doc(db, "borrowedBooks", borrowedId));
      setBorrowedBooks((prev) => prev.filter((b) => b.id !== borrowedId));
    } catch (err) {
      console.log("Error returning book:", err);
    }
  };

  const value = {
    borrowedBooks,
    loadingBorrowed,
    borrowBook,
    returnBook,
  };

  return (
    <BookBorrowContext.Provider value={value}>
      {children}
    </BookBorrowContext.Provider>
  );
}

export function useBorrow() {
  return useContext(BookBorrowContext);
}
