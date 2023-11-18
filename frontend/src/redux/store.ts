import {configureStore} from "@reduxjs/toolkit";
import phrasesReducer from "./reducers/phrasesSlice";

//Main redux state store
export const store = configureStore({
   reducer:{
      // Store for phrases retrieved from backend
      phrases: phrasesReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   }),
});

export type RootState = ReturnType<typeof store.getState>