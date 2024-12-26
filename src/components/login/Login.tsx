"use client";

import { login } from "@/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface LoginFormInputs {
    email: string;
    password: string;
}

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const [error, setError] = useState<string>("")
    const router = useRouter()
    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const user = await login(data)
            if (user?.id) {
                router.push(user.routes[0] || "/" as string)
            }
        } catch (error: any) {
            console.log(error.message)
            setError(error.message)
        }

    };
    return (
        <div className="w-3/12 mx-auto bg-white shadow-lg p-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <h3 className="text-center">Login</h3>
                <div>
                    <label htmlFor="email">Email</label>
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
