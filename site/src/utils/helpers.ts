/**
 * Helper function for retrieving a specific cookie on client-side 
 * @param name - the name of the `cookie`
 * @returns 
 */
export const getCookie = (name: string): string | undefined => {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1];

   return cookieValue;
};

/**
 * Helper function for deleting a specific cookie on client-side 
 * @param name - the name of the `cookie`
 * @returns 
 */
export const eraseCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=0;`;
};