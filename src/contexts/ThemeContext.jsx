import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-init.js';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system'); // Default to system

  // Detect system theme
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  
  useEffect(() => {
    const rootElement = document.getElementById('body');

    if (theme === 'dark') {
      rootElement.classList.add('dark');
      rootElement.classList.remove('light');
    } else if (theme === 'light') {
      rootElement.classList.add('light');
      rootElement.classList.remove('dark');
    } else {
      const systemTheme = getSystemTheme();
      rootElement.classList.add(systemTheme);
      rootElement.classList.remove(systemTheme === 'dark' ? 'light' : 'dark');
      setTheme('system');
    }
  }, [theme]);


  // Fetch theme from Firestore or fallback to system theme
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        const systemTheme = getSystemTheme();
        setTheme(systemTheme);
        return;
      }

      try {
        const username = currentUser.displayName.toLowerCase();
        const docRef = doc(db, 'users', username);
        const docSnap = await getDoc(docRef);

        const savedTheme = docSnap.exists() ? docSnap.data()?.userTheme : null;
        setTheme(savedTheme || getSystemTheme());
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    });

    return () => unsubscribe();
  }, []);



  // Toggle theme and persist it to Firestore
  const toggleTheme = async () => {
    try {
      const currentUser = auth.currentUser;
      const newTheme = theme === 'dark' ? 'light' : 'dark';

      setTheme(newTheme);

      if (currentUser) {
        const username = currentUser.displayName.toLowerCase();
        const docRef = doc(db, 'users', username);
        
        const docSnap = await getDoc(docRef)
        const userDetails = docSnap.data()
          
         if (!userDetails?.userTheme) {
            await setDoc(docRef, {
              userTheme: newTheme
            }, {merge: true});
         } else {
           await updateDoc(docRef, { userTheme: newTheme });
         }
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