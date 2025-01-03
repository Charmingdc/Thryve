import { useState, useEffect, useRef } from "react";

import { db } from '../../firebase/firebase-init';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import getUserId from '../../functions/getUserId';

import SideBar from "../../components/Helpers/SideBar";
import BottomNav from "../../components/Helpers/BottomNav";
import ActionButton from '../../components/Helpers/ActionButton';
import JournalsContainer from "../../components/HomePage/Journals/JournalsContainer";
import SearchBar from "../../components/HomePage/SearchBar/SearchBar";
import "./HomePage.css";


const HomePage = () => {
  const [quote, setQuote] = useState('');
  const hasFetched = useRef(false);
  const [journals, setJournals] = useState([]);
  


  const getRandomQuote = async () => {
    try {
      // quotes api endpoint
      const url = 'https://quote-api-ashen.vercel.app/api/quotes';

      const response = await fetch(`${url}`);
      const result = await response.json();
      const gratitudeQuotes = result['moods'].gratitude;

      // generate a random number with max value of the number of values in quotes array 
      const randomNumber = Math.floor(Math.random() * gratitudeQuotes.length);
      // access a random quote by using a random number as the index
      const randomQuote = gratitudeQuotes[randomNumber];
      
      // update quote state
      setQuote(randomQuote);

    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    const getJournals = async () => {
      try {
        const userId = await getUserId();
        const journalsRef = collection(db, 'journals');
        const q = query(journalsRef, where('userId', '==', userId));

        onSnapshot(q, (snapshot) => {
          let journalData = [];

          snapshot.forEach((doc) => {
            const docData = {...doc.data(), id: doc.id};
            journalData.push(docData);
          });

          setJournals(journalData);
        });
      } catch (err) {
        console.error(err.messsage);
      }
    }

    getJournals();
  }, []);



  useEffect(() => {
    // check if function have run before, if yes return immediately 
    if (hasFetched.current) return;

    getRandomQuote(); // get random quote

    // update hasFetched ref to true
    hasFetched.current = true;
  }, []);
 

  return (
   <>
    <div className="home-page-container">
      <SideBar currentPage="home" />
      
      <div className="home-page">
        <SearchBar />

        <JournalsContainer gratitudeQuote={quote} journals={journals} />
      </div>
    </div>
    
    <ActionButton />
    <BottomNav currentPage="home" />
   </>
  );
};

export default HomePage;
