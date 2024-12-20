import { createContext } from "react";
import { useState } from "react";
import { initialSignInFormData, initialSignUpFormData } from "@/config";

import { registerService } from "@/services";
export const AuthContext=createContext(null);

export default function AuthProvider({children})
{
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

    async function handleRegisterUser(){
        event.preventDefault();
        const data=await registerService(signUpFormData);
        console.log(data);
    }



    return <AuthContext.Provider value={{
        signInFormData,
        setSignInFormData,
        setSignUpFormData,
        signUpFormData,
        handleRegisterUser
    }}>{children}</AuthContext.Provider>
}