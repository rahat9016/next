"use client";

import { setData } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useEffect } from "react";

export default function ServerData({data}:any) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setData(data))
    }, [data, dispatch])
    return <></>;
}
