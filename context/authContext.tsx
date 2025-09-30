import { User } from "@/types/user";
import { createContext, PropsWithChildren, use } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    user: null,
    isLoading: true,
    isAuthenticated: false,
});

export function useAuth() {
    const value = use(AuthContext);
    if (!value) {
        throw new Error("useAuth must be wrapped in a <SessionProvider />");
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoadingStudentId, studentId], setStudentId] = useStorageState("studentId");
    const [[isLoadingCuIdPass, cuIdPass], setCuIdPass] = useStorageState("cuIdPass");

    let user: User | null = null;
    if (studentId && cuIdPass) {
        user = { studentId, cuIdPass };
    }

    const isLoading = isLoadingStudentId || isLoadingCuIdPass;
    const isAuthenticated = Boolean(!isLoading && user !== null);

    return (
        <AuthContext
            value={{
                signIn: () => {
                    // Perform sign-in logic here
                    setStudentId("t324076");
                    setCuIdPass("examplePassword");
                },
                signOut: () => {
                    setStudentId(null);
                    setCuIdPass(null);
                },
                user,
                isLoading,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext>
    );
}
