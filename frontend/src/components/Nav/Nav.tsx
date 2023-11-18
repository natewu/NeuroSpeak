import MicIcon from '@mui/icons-material/Mic';
import styles from './Nav.module.scss';

export default function Nav() {
   return (
      <div className={styles.wrapper}>
         <h1 className={styles.name}>
            NeuroSpeak
         </h1>
         <MicIcon className={styles.mic} />
      </div>
   );
}