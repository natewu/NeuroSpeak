import { Phrase, select, selectPhrase, selectPhrases } from 'redux/reducers/phrasesSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "redux/store";
import styles from './PhraseBox.module.scss';

export default function PhraseBox({phrases}: {phrases: Phrase[]}) {
   const dispatch = useDispatch();
   const statePhrases = useSelector(selectPhrases);
   const [phrase, setPhrase] = useState<Phrase[]>([]);

   // set selected phrase
   function selectPhrase(index: number) {
      dispatch(select(index));
   }

   useEffect(() => {
      // set phrase to phrases filtered from statePhrases
      setPhrase(statePhrases.filter((phrase) => phrase));
   }, [statePhrases, ]);

   // console.log("phrases: ", phrases);

   

   return (
      <div className={styles.PhraseBox}>
         <div className={styles.container}>
            {phrases.map((phrase, index) => (
               <PhraseElement key={index} id={phrase.id}/>
            ))}
         </div>
         
      </div>
   );
}

function PhraseElement({id}: {id: number}) {
   // const phrases = useSelector(selectPhrases);
   const phrase = useSelector((state: RootState) => selectPhrase(state, id));
   const dispatch = useDispatch();
   // const [phrase, setPhrase] = useState<Phrase>();
   const [selected, setSelected] = useState(false);

   // useEffect(() => {
   //    // set phrase to phrases filtered from statePhrases
   //    setPhrase(phrases.filter((phrase) => phrase.id === id)[0]);

   // }, [phrases, id]);

   // console.log("phrase: ", phrase);
   function toggleSelect(index: number) {
      dispatch(select(index));
      setSelected(!selected);
      // console.log(phrases[id])
      
   }

   useEffect(() => {
      // console.log("id: ", id)
     
   }, [phrase, id])
   return(
      <div className={styles.phrase}
         style={{backgroundColor: `${phrase?.selected ? "#31BAD2" : "rgba(128, 128, 128, 0.1)"}`}}
         onClick={() => toggleSelect(id)}
      >
         <p>{phrase?.phrase}</p>
      </div>
   )
}