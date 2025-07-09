import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children }) => {
    const[user,setUser] = useState(null);

    useEffect(()=>{
       const token =  localStorage.getItem("token");
       const username = localStorage.getItem("username");
       const userId = localStorage.getItem("userId");

       if(token){
        setUser({token,username,userId})
       }
    },[])

    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)