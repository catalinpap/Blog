const env_mapping: Record<string, string | undefined> = {
    NEXT_PUBLIC_DEFAULT_THUMBNAIL: process.env.NEXT_PUBLIC_DEFAULT_THUMBNAIL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
};

const enforce = (key: string) => {
    const unvalidated_value = env_mapping[key];
    if(!unvalidated_value) {
        throw new Error(`Environment variable not found or empty: ${key}`);
    }
    return unvalidated_value;
}

const is_development: boolean = (process.env.NODE_ENV === "development");

type ConfigKeys = "default_thumbnail" | "api_base_url";

export const config: Record<ConfigKeys, string> = {
    default_thumbnail: enforce("NEXT_PUBLIC_DEFAULT_THUMBNAIL"),
    api_base_url: enforce("NEXT_PUBLIC_API_BASE_URL")
};