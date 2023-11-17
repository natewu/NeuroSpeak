import 'App.module.scss';

import PhraseBox from "../PhraseBox/PhraseBox";
import styles from './PhraseSelector.module.scss';

type PhraseContainerProps = {
   phrasebox: any[2];
 };

export default function PhraseSelector({ phrasebox }: PhraseContainerProps) {
   return (
      <div className={styles.wrapper}>
            <PhraseBox phrases={phrasebox[0]} />   
            {/* Separator line */}
            <div className="line"/>
            <PhraseBox phrases={phrasebox[1]} />   
      </div>
   );
}