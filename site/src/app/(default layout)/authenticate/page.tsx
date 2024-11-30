'use client';

import { useAuth } from "@/utils/useAuth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const AuthenticatePage = () => {
    const { login, register } = useAuth();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');
    
    const login_user = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const user = formData.get('user');
        const password = formData.get('password');

        try {
            await login({
                "user": user,
                "password": password
            });
            router.push('/');
        } catch (exception) {
            if (exception instanceof Error) setErrorMessage(exception.message);
            else alert('Something bad happened! Try again later');
        }
    };

    const register_user = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const user = formData.get('user');
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');

        try {
            await register({
                "username": user,
                "displayName": name,
                "email": email,
                "password": password
            });
            
            alert('User created');
        } catch (exception) {
            if (exception instanceof Error) setErrorMessage(exception.message);
            else alert('Something bad happened! Try again later');
        }
    }

    return (
        <main className="page-content">
            <div className={"block w-full h-40"}></div>
            <article className={"flex gap-4"}>
                <form onSubmit={login_user} className={"flex flex-col gap-2 w-full"}>
                    <h1>Login</h1>
                    <input type={"text"} name={"user"} placeholder={"Username*"} className={"p-2"} required />
                    <input type={"password"} name={"password"} placeholder={"Password*"} className={"p-2"} required />
                    <button type={"submit"} className={"bg-green text-white text-md font-medium cursor-pointer p-2"}>Login</button>
                    <p>{errorMessage}</p>
                </form>
                <form onSubmit={register_user} className={"flex flex-col gap-2 w-full"}>
                    <h1>Register</h1>
                    <input type={"text"} name={"user"} placeholder={"Username*"} className={"p-2"} required />
                    <input type={"text"} name={"name"} placeholder={"Your Name"} className={"p-2"} />
                    <input type={"email"} name={"email"} placeholder={"E-mail*"} className={"p-2"} required />
                    <input type={"password"} name={"password"} placeholder={"Password*"} className={"p-2"} required />
                    <input type={"password"} name={"passwordConfirm"} placeholder={"Confirm Password*"} className={"p-2"} required />
                    <button type={"submit"} className={"bg-green text-white text-md font-medium cursor-pointer p-2"}>Create account</button>
                </form>
            </article>
            
        </main>
    );
};

export default AuthenticatePage;