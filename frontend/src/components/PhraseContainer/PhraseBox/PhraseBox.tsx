import styles from './PhraseBox.module.scss';

export default function PhraseBox({phrases}: {phrases: string[]}) {
   return (
      <div className={styles.PhraseBox}>
         <div className={styles.container}>
            {phrases.map((phrase, index) => (
               <div key={index} className={styles.phrase}>
                  <p>{phrase}</p>
               </div>
            ))}
         </div>
         
      </div>
   );
}