'use client';

import { ArrowBackIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

export const NavigateBackButton: React.FC<{className?: string}> = ({className}) => {
    const router = useRouter();

    const navigateBack = () => {
        router.back();
    };
    
    return (
        <button onClick={navigateBack} className={`flex items-center gap-1 mb-4 leading-snug font-light text-lg ${className}`}>
            <ArrowBackIcon /> 
            Go back
        </button>
    );
};