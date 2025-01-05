'use client';

import { config } from "@/config";
import { User } from "@/types";
import { getCookie } from "@/utils/helpers";
import { createContext, ReactNode, useEffect, useState } from "react";

const getUser = async () => {
    const authToken = getCookie('authToken');
    if (!authToken) return null;
    
    const response = await fetch(`${config.api_base_url}/me`, {
        method: 'POST',
        headers: {
            'authorization': `basic ${authToken}`
        },
        credentials: 'include'
    });
    if (!response.ok) return null;
    return await response.json();
};

export type UserContextType = {
    user: User | null,
    setUser: (user: User | null) => void
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // TODO: BUG: on refresh, the in-memory user is lost, even though, the auth cookies are still set
        // Partially solved, might still be buggy
        getUser().then(user => {
            // if(!user) return;
            setUser(user);
        });
    }, []);
    
    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}