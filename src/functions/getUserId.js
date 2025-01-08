import { auth } from '../firebase/firebase-init.js';
import { onAuthStateChanged } from 'firebase/auth';


const getUserId = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // resolve uid if user is signed in
        resolve(user.uid);
      } else {
        reject('No user signed in');
      }

      unsubscribe();
    }, (err) => {
      // reject error
      reject(err);

      // unsubscribe from active listener 
      unsubscribe();
    });
  });
}

export default getUserId;