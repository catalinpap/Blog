'use client';

import { useEffect, useState } from "react";

type ValueType = string | number | undefined;

type EditableFieldProps = {
    value: string,
    label?: string,
    actionText?: string,
    onSubmit?: (value: string) => void
};

export const EditableField:React.FC<EditableFieldProps> = ({ value, label, actionText = 'Edit', onSubmit}) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleCancel = () => {
        setEditing(false);
        setInputValue(value);
    };

    const handleSubmit = async () => {
        if (onSubmit) {
            try {
                await onSubmit(inputValue); // Await the result to catch async errors
            } catch (e) {
                if (e instanceof Error) {
                    console.log("Caught error:", e.message);
                } else {
                    console.log(String(e));
                }
                setInputValue(value); // Reset to original value on error
            }
        }
        setEditing(false);
    };
    

    return (
        <section className="flex items-center justify-between p-4 text-dark-gray">
            {
                editing
                ? <input className="text-xl font-medium p-2" 
                    value={inputValue} 
                    autoFocus={true} 
                    onChange={(e) => setInputValue(e.currentTarget.value)} />
                : <p className="text-xl font-medium">{label ? label : inputValue}</p>
            }
            {
                editing
                ? <div className="flex items-center gap-3">
                    <button onClick={handleCancel} 
                        className="text-red-500 hover:underline">
                            Cancel
                    </button>
                    <button onClick={handleSubmit} 
                        className="px-2 py-1 text-light bg-green">
                            Confirm
                    </button>
                </div>
                : <button className="text-base font-light text-gray underline" onClick={() => setEditing(!editing)}>{actionText}</button>
            }
            
        </section>
    );
};