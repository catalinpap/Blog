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

    return (
        <main className="page-content">
            <div className={"block w-full h-40"}></div>
            <form onSubmit={login} className={"flex flex-col gap-2"}>
                <h1>Login</h1>
                <input type={"text"} name={"user"} placeholder={"Username"} className={"p-2"} />
                <input type={"password"} name={"password"} placeholder={"Password"} className={"p-2"} />
                <button type={"submit"} className={"bg-green text-white text-md font-medium cursor-pointer p-2"}>Login</button>
                <p>{errorMessage}</p>
            </form>
        </main>
    );
};

export default AuthenticatePage;