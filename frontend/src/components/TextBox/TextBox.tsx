import React from 'react';
import styles from './TextBox.module.scss';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextBox(props: Props) {
   return (
      <div className={styles.wrapper}>
        textbox or something
      </div>
   );
}
