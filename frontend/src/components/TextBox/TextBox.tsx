import {ReactComponent as Arrows} from './arrows.svg';
import EastIcon from '@mui/icons-material/East';
import NorthIcon from '@mui/icons-material/North';
import React from 'react';
import WestIcon from '@mui/icons-material/West';
import styles from './TextBox.module.scss';
import { useWindupString } from "windups";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextBox(props: Props) {
   const [phrase, setPhrase] = React.useState(props.value);
   const [text] = useWindupString("What would you like to say?");

   return (
      <div className={styles.wrapper}>
         <div className={styles.phrasebox}>
            {phrase === "" ? text : phrase}
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
