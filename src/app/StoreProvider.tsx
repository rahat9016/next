"use client"

import { getCookie } from "@/lib/cookie";
import { setUserInformation } from "@/lib/redux/features/auth/authSlice";
import { AppStore, makeStore } from "@/lib/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: ReactNode }) {
    const storeRef = useRef<AppStore>();
    const user = getCookie("token");
    if (!storeRef.current) {
        storeRef.current = makeStore();
        // We can store initial data in this here.
        storeRef.current.dispatch(setUserInformation(user))

    }
    return <Provider store={storeRef.current}>{children}</Provider>;
}
