import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-init.js';

export const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default theme


  // Update the CSS root variables when theme changes
  useEffect(() => {
    const rootElement = document.getElementById('body')

    if (theme === 'light') {
      rootElement.classList.add('light');
    } else {
      rootElement.classList.remove('light');
    }
  }, [theme]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return;

      try {
        const username = currentUser.displayName.toLowerCase();
        const docRef = doc(db, 'users', username);
        const docSnap = await getDoc(docRef);

        const userDetails = docSnap.exists() ? docSnap.data() : {};
        const savedTheme = userDetails?.userTheme || 'dark';
        setTheme(savedTheme);
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    });

    return () => unsubscribe();
  }, []);


  const toggleTheme = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const username = currentUser.displayName.toLowerCase();
      const docRef = doc(db, 'users', username);
      const docSnap = await getDoc(docRef);

      const userDetails = docSnap.exists() ? docSnap.data() : {};
      const savedTheme = userDetails?.userTheme || 'dark';
      const updatedTheme = savedTheme === 'dark' ? 'light' : 'dark';

      setTheme(updatedTheme);

      if (!userDetails.userTheme) {
        await setDoc(docRef, { userTheme: updatedTheme }, { merge: true });
      } else {
        await updateDoc(docRef, { userTheme: updatedTheme });
      }
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);