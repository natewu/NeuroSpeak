import { RootState } from "redux/store";
import {createSlice} from "@reduxjs/toolkit";

class Phrase {
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
         state.selectedPhrases.push(action.payload);
         state.phrases[action.payload].selected = true;
      },
      add: (state, action) => {
         state.phrases.push(new Phrase(state.phrases.length, action.payload));
      }
   }
});

export const {select, add} = phrasesSlice.actions;

export const selectPhrases = (state: RootState) => state.phrases.phrases;

export default phrasesSlice.reducer;

