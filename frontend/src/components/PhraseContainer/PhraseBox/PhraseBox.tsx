import { Phrase, select } from 'redux/reducers/phrasesSlice';

import styles from './PhraseBox.module.scss';
import { useDispatch } from "react-redux";

export default function PhraseBox({phrases}: {phrases: Phrase[]}) {
   const dispatch = useDispatch();

   // set selected phrase
   function selectPhrase(index: number) {
      dispatch(select(index));
      
   }
   return (
      <div className={styles.PhraseBox}>
         <div className={styles.container}>
            {phrases.map((phrase, index) => (
               <div key={index} className={styles.phrase}
                  style={{backgroundColor: `${phrase.selected ? "#31BAD2" : "rgba(128, 128, 128, 0.1)"}`}}
                  onClick={() => selectPhrase(phrase.id)}
               >
                  <p>{phrase.phrase}</p>
               </div>
            ))}
         </div>
         
      </div>
   );
}