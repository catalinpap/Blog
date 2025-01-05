import { ApiResponse, User } from "@/types";
import { eraseCookie, getCookie } from "../utils/helpers";
import { useContext } from "react";
import { UserContext, UserContextType } from "@/context/user-context/user-context";
import { config } from "@/config";

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

export const useAuth = () => { 
    const { user, setUser } = useContext(UserContext) as UserContextType;

    /**
     * 
     * @param payload - the data to be transmitted in the `request body`
     * @throws Error
     */
    const login = async (payload: Object) => {
        const loginResponse = await fetch(`${config.api_base_url}/login`, {
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
        const registerResponse = await fetch(`${config.api_base_url}/users`, {
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