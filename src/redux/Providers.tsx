"use client"

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { Suspense } from "react";
import { injectStore } from "@/api";
import Preloader from "@/components/UI/Preloader";
import { Toaster } from "sonner";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import appTheme from "@/theme";

injectStore(store)

export function Providers({ children }: { children: React.ReactNode }) {

    const chakraTheme = extendTheme(appTheme);

  return (
    <Provider store={store}>
        <PersistGate loading={<Preloader />} persistor={persistor}>
            <ChakraProvider theme={chakraTheme}>
                <Toaster richColors position="bottom-right" />
                {children}
            </ChakraProvider>
        </PersistGate>
    </Provider>);
}
