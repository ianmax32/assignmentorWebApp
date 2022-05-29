import React,{createContext, useState, useEffect} from 'react'

const UserContext = createContext();

export function UserProvider({children}){
    const [user,setUserProfile] = useState({
        email:'',
        password:''
    });

    const [personLog, setpersonLog] = useState(false)

    function LoggedIn(emailEntered){
        console.log('loggedin')
        setUserProfile({
            ...user, email:emailEntered
        })
    }

    function successLogin(){
        setpersonLog({
            personLog:true
        })
        console.log('sucesssfull login')
        
        
    }

    return(
        <UserContext.Provider value={{user, LoggedIn,successLogin, setUserProfile, personLog}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
