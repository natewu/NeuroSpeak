import { RootState } from "redux/store";
import {createSlice} from "@reduxjs/toolkit";

export class Phrase {
   id: number;
   phrase: string;
   selected: boolean;

   constructor(id: number, phrase: string) {
      this.id = id;
      this.phrase = phrase;
      this.selected = false;
   }
}

export const phrasesSlice = createSlice({
   name: "phrases",
   initialState: {
      phrases: [] as Phrase[],
      selectedPhrases: [] as number[],
      loading: false,
      error: false,
      errorMessage: "",
   },
   reducers: {
      select: (state, action) => {

         // if already selected, unselect
         if (state.phrases[action.payload].selected) {
            state.selectedPhrases = state.selectedPhrases.filter((p) => p !== action.payload);
            state.phrases[action.payload].selected = false;
            return;
         }
         state.selectedPhrases.push(action.payload);
         state.phrases[action.payload].selected = true;
      },
      add: (state, action) => {
         for (let i = 0; i < action.payload.length; i++) {
            const phrase = new Phrase(i, action.payload[i]);
            
            // dont add if already exists
            if (state.phrases.find((p) => p.phrase === phrase.phrase)) {
               continue;
            }

            state.phrases.push(phrase);
         }
      }
   }
});

export const {select, add} = phrasesSlice.actions;

export const selectPhrases = (state: RootState) => state.phrases.phrases;

export default phrasesSlice.reducer;

