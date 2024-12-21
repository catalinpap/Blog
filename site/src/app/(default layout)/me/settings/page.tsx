'use client';

import { EditableField } from "@/components/common";
import { useAuth } from "@/hooks";
import { User } from "@/types";
import { getCookie } from "@/utils/helpers";

const SettingsPage: React.FC = () => {
    const { user } = useAuth();

    const updateUser = async (field: keyof User, value: string): Promise<void> => {
        if (!user) return;
    
        try {
            const response = await fetch(`http://localhost:8080/api/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${getCookie('authToken')}`,
                },
                body: JSON.stringify({
                    id: user.id,
                    [field]: value,
                }),
            });
    
            if (!response.ok) {
                const res = await response.json();
                console.log(res);
                throw new Error(
                    `Failed to update '${field}' with value '${value}' on user with id = ${user.id}`
                );
            }
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
            throw e; // Re-throw to propagate the error to the caller
        }
    };
    

    return (
        (!user) 
        ? <p>You need to login first</p>
        :<main className="page-content my-0 divide-y divide-light-gray">
            <article className="py-8">
                <h1 className="text-2xl font-bold tracking-wider leading-normal">About</h1>
                <EditableField value={`@${user.username}`}  actionText="Change username" />
                <EditableField 
                    value={user.displayName} 
                    actionText="Change name" 
                    onSubmit={(updatedValue) => updateUser("displayName", updatedValue)}
                />
                <EditableField value={`${user.email}`} actionText="Change e-mail" />
            </article>
            <article className="py-8 flex flex-col">
                <h1 className="text-2xl font-bold tracking-wider leading-normal">Password</h1>
                <section className="flex items-center justify-between p-4 text-dark-gray">
                    <label className="text-xl font-medium">Old password:</label>
                    <input type="password" placeholder={"old password"} className="p-2" />
                </section>
                <section className="flex items-center justify-between p-4 text-dark-gray">
                    <label className="text-xl font-medium">New password:</label>
                    <input type="password" placeholder={"new password"} className="p-2" />
                </section>
                <section className="flex items-center justify-between p-4 text-dark-gray"> 
                    <label className="text-xl font-medium">Confirm new password:</label>
                    <input type="password" placeholder={"confirm new password"} className="p-2" />
                </section>
                <button className="button-primary relative w-fit self-end">Confirm</button>
            </article>
            
            
        </main>
    );
};

export default SettingsPage;