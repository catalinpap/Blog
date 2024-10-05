'use client';

import { FormEvent } from "react";

const AuthenticatePage = () => {
    
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
            })
        });

        const isUserValid = await loginResponse.json();
    }

    return (
        <main className="page-content">
            <div className={"block w-full h-40"}></div>
            <form onSubmit={login} className={"flex flex-col gap-2"}>
                <h1>Login</h1>
                <input type={"text"} name={"user"} placeholder={"email or username"} className={"p-2"} />
                <input type={"password"} name={"password"} placeholder={"password"} className={"p-2"} />
                <button type={"submit"} className={"bg-green cursor-pointer p-2"}>Login</button>
            </form>
        </main>
    )
}

export default AuthenticatePage;