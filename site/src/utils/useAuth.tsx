import { ApiResponse, User } from "@/types";
import { eraseCookie, getCookie } from "./helpers";
import { useContext } from "react";
import { UserContext, UserContextType } from "@/context/user-context/user-context";

const user = async () => {
    const authToken = getCookie('authToken');
    if (!authToken) return null;
    
    const response = await fetch('http://localhost:8080/api/me', {
        method: 'POST',
        headers: {
            'authorization': `basic ${authToken}`
        },
        credentials: 'include'
    });
    if (!response.ok) return null;
    return await response.json();
};

export const useAuth = () => {
    const { user, setUser } = useContext(UserContext) as UserContextType;

    /**
     * 
     * @param payload - the data to be transmitted in the `request body`
     * @throws Error
     */
    const login = async (payload: Object) => {
        const loginResponse = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        });

        if (loginResponse.ok) {
            const loggedUser: ApiResponse = await loginResponse.json();
            setUser(loggedUser.data as User);
        } else {
            const data: ApiResponse = await loginResponse.json();
            throw new Error(data.message);
        }
    };

    /**
     * 
     * @param requestBody - the data to be transmitted in the `request body`
     * @throws Error
     */
    const register = async (payload: Object) => {
        const registerResponse = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (registerResponse.ok) {
        
        } else {
            const data: ApiResponse = await registerResponse.json();
            throw new Error(data.message);
        }
    };

    const logout = () => {
        eraseCookie('authenticated');
        eraseCookie('authToken');
        setUser(null);
    };

    return {
        login,
        register,
        logout,
        user
    };
};