import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import thunk, { ThunkAction } from "redux-thunk";
import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice"
import quizReducer from "../slices/quiz/quizSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth']
}


const quizPersistConfig = {
    key: 'quiz',
    storage,
    whitelist: ['quiz', 'schoolRegistration', 'selectedRoundParticipation']
}

const rootReducer = combineReducers({
    auth: authReducer,
    quiz: persistReducer(quizPersistConfig, quizReducer)
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    // middleware: [thunk],
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(thunk),
    devTools: process.env.NODE_ENV !== 'production'
})

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const persistor = persistStore(store)

const persistor = persistStore(store);

export { store, persistor }

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;