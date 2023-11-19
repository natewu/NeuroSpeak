import React, { useEffect, useState } from 'react';
import { selectPhrase, selectPhrases } from "redux/reducers/phrasesSlice";

import {ReactComponent as Arrows} from './arrows.svg';
import EastIcon from '@mui/icons-material/East';
import NorthIcon from '@mui/icons-material/North';
import WestIcon from '@mui/icons-material/West';
import styles from './TextBox.module.scss';
import { useSelector } from "react-redux";
import { useWindupString } from "windups";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextBox(props: Props) {
   const phrase = useSelector(selectPhrases);
   const [text] = useWindupString("What would you like to say?");

   const [selected, setSelected] = useState<null|string>(null);

   // Filter out the phrase that is selected
   useEffect(() => {
      const selectedPhrase = phrase.filter((phrase) => phrase.selected)[0];
      if (selectedPhrase) {
         setSelected(selectedPhrase.phrase);
      }
   }, [phrase]);

   return (
      <div className={styles.wrapper}>
         <div className={styles.phrasebox}>
            {selected === null ? text : selected}
         </div>
         <div className={styles.nav_wrapper}>
            <div className={styles.nav}>
               <WestIcon className={styles.west} />
               <NorthIcon className={styles.north} />
               <EastIcon className={styles.east} />
            </div>
         </div>
      </div>
   );
}
