import Nav from "components/Nav/Nav";
import PhraseBox from "./components/PhraseContainer/PhraseBox/PhraseBox";
import PhraseContainer from "./components/PhraseContainer/PhraseContainer";
import TextBox from "./components/TextBox/TextBox";
import styles from "./App.module.scss";

const left = [
   ["hello", "whats up", "hi"],
   ["yo", "hey", "sup"],
];

const right = [
   ["goodbye", "bye", "see ya"],
   ["later", "peace", "cya"],
];

function App() {
   return (
      <div className={styles.App}>
         <Nav />
         <TextBox value="Hello" onChange={() => {}} />
         <PhraseContainer left={left} right={right} />
      </div>
   );
}

export default App;
