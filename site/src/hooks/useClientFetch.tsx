'use client';

import { config } from "@/config";
import { getCookie } from "@/utils/helpers";
import { useCallback, useEffect, useReducer } from "react";

type HttpMethods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

enum FETCH_ACTIONS {
    START,
    SUCCESS,
    ERROR
};

type HttpState = {
    data: Object | null,
    loading: boolean,
    error: Object | null
};

type Action = {
    type: FETCH_ACTIONS,
    payload: Object
}

const initialHttpState: HttpState = {
    data: null,
    loading: false,
    error: null
};

const httpReducer = (state: HttpState, action: Action): HttpState => {
    const {type, payload} = action;
    switch(type) {
        case FETCH_ACTIONS.START:
            return {
                ...state,
                loading: state.data ? false : true,
                error: null
            };
        case FETCH_ACTIONS.SUCCESS:
            return {
                data: payload,
                loading: false,
                error: null
            };
        case FETCH_ACTIONS.ERROR:
            return {
                data: null,
                loading: false,
                error: payload
            };
        default:
            return initialHttpState;
    };
};

export const useClientFetch = (
        endpoint: string,
        {method = 'GET', body}: {method?: HttpMethods, body?: string} = {},
        base_url: string = config.api_base_url
    ) => {

        const [httpState, dispatch] = useReducer(httpReducer, initialHttpState);

        const fetchData = useCallback(() => {
            dispatch({ type: FETCH_ACTIONS.START, payload: {}});
    
            fetch(`${base_url}/${endpoint}`, { 
                method,
                body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `basic ${getCookie('authToken')}`
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => dispatch({ type: FETCH_ACTIONS.SUCCESS, payload: data }))
                .catch((error) =>
                    dispatch({ type: FETCH_ACTIONS.ERROR, payload: { message: error.message } })
                );
        }, [endpoint, method, base_url]);

        useEffect(() => {
            fetchData();
        }, [fetchData]);
        

    return [httpState.data];
};