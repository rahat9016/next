"use client";

import { setData } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useEffect } from "react";
import { IUser } from "./interface";

export default function ServerData({data}: {data: IUser}) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setData(data))
    }, [data, dispatch])
    return <></>;
}
