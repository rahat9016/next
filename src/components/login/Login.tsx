"use client";

import { login } from "@/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUserInformation } from "@/lib/redux/features/auth/authSlice";


interface LoginFormInputs {
    email: string;
    password: string;
}
function isErrorWithMessage(error: unknown): error is { message: string } {
    return typeof error === "object" && error !== null && "message" in error;
}
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const [error, setError] = useState<string>("")
    const router = useRouter()
    const dispatch = useAppDispatch()
    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const user = await login(data)
                if (user?.id) {
                    dispatch(setUserInformation(user))
                    router.push(user.routes[0] || "/" as string)
                }
        } catch (error) {
            if (isErrorWithMessage(error)) {
                console.log(error.message);
                setError(error.message);
            } else {
                console.log("An unknown error occurred");
                setError("An unknown error occurred");
            }
        }

    };
    return (
        <div className="w-3/12 mx-auto dark:bg-zinc-900 bg-white shadow-lg p-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <h3 className="text-center">Login</h3>
                <div>
                    <label htmlFor="email" className="dark:text-white">Email</label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                {error && (
                    <p className="text-red-500 text-sm mt-1">
                        {error}
                    </p>
                )}
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </div>
    );
}
