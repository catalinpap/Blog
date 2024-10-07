'use client';

import { ApiResponse } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const AuthenticatePage = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');
    
    const login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const user = formData.get('user');
        const password = formData.get('password');

        const loginResponse = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                "user": user,
                "password": password
            }),
            credentials: 'include'
        });

        if (loginResponse.ok) {
            router.push('/');
        } else {
            const data: ApiResponse = await loginResponse.json();
            setErrorMessage(data.message);
        }
    };

    const register = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const user = formData.get('user');
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');

        const registerResponse = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                "username": user,
                "displayName": name,
                "email": email,
                "password": password
            }),
        });

        if (registerResponse.ok) {
            alert('User created');
            // router.push('/');
        } else {
            const data: ApiResponse = await registerResponse.json();
            setErrorMessage(data.message);
        }
    }

    return (
        <main className="page-content">
            <div className={"block w-full h-40"}></div>
            <article className={"flex gap-4"}>
                <form onSubmit={login} className={"flex flex-col gap-2 w-full"}>
                    <h1>Login</h1>
                    <input type={"text"} name={"user"} placeholder={"Username*"} className={"p-2"} required />
                    <input type={"password"} name={"password"} placeholder={"Password*"} className={"p-2"} required />
                    <button type={"submit"} className={"bg-green text-white text-md font-medium cursor-pointer p-2"}>Login</button>
                    <p>{errorMessage}</p>
                </form>
                <form onSubmit={register} className={"flex flex-col gap-2 w-full"}>
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