import { add, selectPhrases } from "redux/reducers/phrasesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Nav from "components/Nav/Nav";
import Phrase from "redux/reducers/phrasesSlice";
import PhraseBox from "./components/PhraseContainer/PhraseBox/PhraseBox";
import PhraseContainer from "./components/PhraseContainer/PhraseContainer";
import TextBox from "./components/TextBox/TextBox";
import styles from "./App.module.scss";

// const left = [
//    ["hello", "whats up", "hi", "yo"],
//    ["yo", "hey", "sup"],
// ];

// const right = [
//    ["goodbye", "bye", "see ya", "later"],
//    ["later", "peace", "cya"],
// ];

function App() {
   const phrases = useSelector(selectPhrases);
   const dispatch = useDispatch();

   const [left, setLeft] = useState([]);
   const [right, setRight] = useState([]);

   useEffect(() => {
      if (phrases.length === 0){
         dispatch(
            add(
               [
                  "hello!!",
                  "whats up",
                  "hi",
                  "yo",
                  "sup",
                  "hey",
                  "goodbye",
                  "bye",
               ]
            )
         );
      }
      else{
         console.log("phrases already loaded")
      }
      
   }, [dispatch, phrases])

   // update left and right if phrases is selected
   useEffect(() => {
      const [leftSide, rightSide] = (splitPhrases(phrases));
      setLeft(leftSide);
      setRight(rightSide);
      console.log("left: ", leftSide);
      console.log("right: ", rightSide);
   }, [phrases]);


   function splitPhrases(phrases: any) {
      const left = phrases.slice(0, Math.ceil(phrases.length / 2));
      const right = phrases.slice(Math.ceil(phrases.length / 2));
      return [left, right];
   }

   useEffect(() => {
      const [leftSide, rightSide] = (splitPhrases(phrases));
      setLeft(leftSide);
      setRight(rightSide);
      // console.log("left: ", leftSide);
      // console.log("right: ", rightSide);
   }, [phrases]);

   return (
      <div className={styles.App}>
         <Nav />
         <TextBox value="Hello" onChange={() => {}} />
         <PhraseContainer left={left} right={right} />
      </div>
   );
}

export default App;
