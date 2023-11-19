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

   select(bool: boolean = false) {
      this.selected = bool;
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
         // must not mutate state directly
         const target = state.phrases.find((p) => p.id === action.payload);
         const index = state.phrases.findIndex((p) => p.id === action.payload);
         // state.phrases[index].selected = !state.phrases[index].selected;

         // add or remove from selectedPhrases
         // if (state.phrases[index].selected) {
         //    state.selectedPhrases.push(state.phrases[index].id);
         // } else {
         //    state.selectedPhrases = state.selectedPhrases.filter((p) => p !== state.phrases[index].id);
         // }

         // only one selected at a time
         const draft = new Phrase(state.phrases[index].id, state.phrases[index].phrase);
         draft.select(!target!.selected);

         state.phrases[index] = draft;

         state.phrases.forEach((p) => {
            if (p.id !== target!.id) {
               p.select(false);
            }
         });
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
      },
      filter: (state, action) => {
         // filter from input array of id's and return the array state for those id's
         state.phrases = state.phrases.filter((p) => action.payload.includes(p.id));

      },
      clear: (state) => {
         state.phrases = [];
         state.selectedPhrases = [];
      }
   }
});

export const {select, add, clear} = phrasesSlice.actions;

export const selectPhrases = (state: RootState) => state.phrases.phrases;
export const selectPhrase = (state: RootState, id: number) => state.phrases.phrases[id];

export default phrasesSlice.reducer;

