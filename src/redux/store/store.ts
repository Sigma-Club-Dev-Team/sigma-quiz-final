import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import thunk, { ThunkAction } from "redux-thunk";
import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice"
import medicineReducer from "../slices/medicine/medicineSlice"
import prescriptionReducer from "../slices/prescrption/prescriptionSlice"
import orderReducer from "../slices/order/orderSlice";
import testReducer from "../slices/tests/testSlice";
import doctorReducer from "../slices/doctor/doctorSlice";
import consultationReducer from "../slices/consultation/consultationSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authReducer,
    medicine: medicineReducer,
    prescription: prescriptionReducer,
    order: orderReducer,
    test: testReducer,
    doctor: doctorReducer,
    consultation: consultationReducer,
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