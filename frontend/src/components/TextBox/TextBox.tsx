import React from 'react';
import styles from './TextBox.module.scss';
import useWindup from "windups/dist/react/useWindup";
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
         {phrase === "" ? text : phrase}
      </div>
   );
}
