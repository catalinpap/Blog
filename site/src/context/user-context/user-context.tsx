'use client';

import { User } from "@/types";
import { createContext, ReactNode, useState } from "react";

export type UserContextType = {
    user: User | null,
    setUser: (user: User | null) => void
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    
    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}