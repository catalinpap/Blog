const getEnvironmentVariable = (environmentVariable: string): string => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if(!unvalidatedEnvironmentVariable) {
        throw new Error (
            `Couldn't find environment variable: ${environmentVariable}`
        );
    } else {
        return unvalidatedEnvironmentVariable;
    }
};

export const config = {
    // defaultThumbnail: getEnvironmentVariable("NEXT_PUBLIC_DEFAULT_THUMBNAIL"), // TODO: debug process.env not working
    defaultThumbnail: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};