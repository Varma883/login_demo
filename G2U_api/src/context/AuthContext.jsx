import React, { Children, createContext, useContext, useState } from "react";
import axios from "axios";

// TO store the login logout details
const AuthContext = createContext();

// to wrap the odjs and values in this file to send it to all the files
export const AuthProvider = ({children}) =>{
    const [user, setUser] =useState(null)  // null becouse no one logged in

    const login = async(email,password) =>{
        try{
            const response = await axios.post('https://g2u.mavenerp.in/g2uapi/public/api/login',
                {email, password}
            );
            if(response.data.status){
                const token =response.data.token;
                // localStorage is a built-in browser storage system , .setItem(key, value)-It saves a value under a key name.
                localStorage.setItem('authToken', token) 
                setUser({email});
                return true;
            }
            else{
                throw new Error("login Failed")
            }
        }
        catch(error){
            console.error("login Error:" , error.message);
            throw error;
        }
    };

    const logout = ()=>{
        localStorage.removeItem("authtoken");
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, login , logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// we can impor this into all the files and the acces the values and funtions
export const useAuth = ()=>useContext(AuthContext);


