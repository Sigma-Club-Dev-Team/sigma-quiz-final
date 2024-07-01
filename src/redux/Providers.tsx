"use client"

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { Suspense, useEffect } from "react";
import { injectStore } from "@/api";
import Preloader from "@/components/UI/Preloader";
import { toast, Toaster } from "sonner";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import appTheme from "@/theme";
import { useAppSelector } from "./hooks";

injectStore(store)

export function Providers({ children }: { children: React.ReactNode }) {
    // const { errorFetching } = useAppSelector(state => state.quiz)
    const chakraTheme = extendTheme(appTheme);


  return (
    <Provider store={store}>
        <PersistGate loading={<Preloader />} persistor={persistor}>
            <ChakraProvider theme={chakraTheme}>
                <Toaster richColors position="bottom-right" duration={10000} />
                {children}
            </ChakraProvider>
        </PersistGate>
    </Provider>);
}
