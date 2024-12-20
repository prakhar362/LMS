import { createContext } from "react";
import { useState } from "react";
import { initialSignInFormData, initialSignUpFormData } from "@/config";

import { registerService,loginService } from "@/services";
export const AuthContext=createContext(null);

export default function AuthProvider({children})
{
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null,
      });
    const [loading, setLoading] = useState(true);
    async function handleRegisterUser(){
        event.preventDefault();
        const data=await registerService(signUpFormData);
        console.log(data);
        
    }

    async function handleLoginUser(){
        event.preventDefault();
        const data=await loginService(signInFormData);
        console.log(data);
        if(data.success){
            sessionStorage.setItem('accessToken',JSON.stringify(data.data.accessToken));
            setAuth({
                authenticate:true,
                user: data.data.user
            })
        }
        else{
            setAuth({
                authenticate:false,
                user: null,
            })

        }
        
    }

    //check auth-user
    async function checkAuthUser() {
        try {
          const data = await checkAuthService();
          if (data.success) {
            setAuth({
              authenticate: true,
              user: data.data.user,
            });
            setLoading(false);
          } else {
            setAuth({
              authenticate: false,
              user: null,
            });
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          if (!error?.response?.data?.success) {
            setAuth({
              authenticate: false,
              user: null,
            });
            setLoading(false);
          }
        }
      }

    return <AuthContext.Provider value={{
        signInFormData,
        setSignInFormData,
        setSignUpFormData,
        signUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth
    }}>{children}</AuthContext.Provider>
}