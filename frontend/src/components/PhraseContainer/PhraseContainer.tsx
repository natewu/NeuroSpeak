import PhraseBox from './PhraseBox/PhraseBox';
import PhraseSelector from "./PhraseSelector/PhraseSelector";
import styles from './PhraseContainer.module.scss';

type PhraseContainerProps = {
   left: any[];
   right: any[];
};

export default function PhraseContainer({left, right}: PhraseContainerProps) {
   return (
      <div className={styles.wrapper}>
         <PhraseSelector phrasebox={left} style={{marginLeft: "-10px"}}/>
         <PhraseSelector phrasebox={right} style={{marginRight: "-10px"}}/>
      </div>
   );
};

