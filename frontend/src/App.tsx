import { add, selectPhrases } from "redux/reducers/phrasesSlice";
import { useDispatch, useSelector } from "react-redux";

import Nav from "components/Nav/Nav";
import PhraseBox from "./components/PhraseContainer/PhraseBox/PhraseBox";
import PhraseContainer from "./components/PhraseContainer/PhraseContainer";
import TextBox from "./components/TextBox/TextBox";
import styles from "./App.module.scss";
import { useEffect } from "react";

const left = [
   ["hello", "whats up", "hi"],
   ["yo", "hey", "sup"],
];

const right = [
   ["goodbye", "bye", "see ya"],
   ["later", "peace", "cya"],
];

function App() {
   const phrases = useSelector(selectPhrases);
   const dispatch = useDispatch();


   useEffect(() => {
      if (phrases.length === 0){
         dispatch(
            add(
               {
                  1: ["hello", "whats up", "hi"],
                  2: ["yo", "hey", "sup"],
                  3: ["goodbye", "bye", "see ya"],
               }
            )
         );
      }
      else{
         console.log("phrases already loaded")
      }
      
   }, [dispatch, phrases])

   console.log(phrases)

   

   return (
      <div className={styles.App}>
         <Nav />
         <TextBox value="Hello" onChange={() => {}} />
         <PhraseContainer left={left} right={right} />
      </div>
   );
}

export default App;
