import { useState, createContext, useEffect } from "react";
import { getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import { auth } from "../../firebase";

const AssignmentsContext = createContext()


export function AssignmentsProvider({children}){
    const [assignments, setAssignemnts] = useState([])
    const [assignment, setAssignemnt] = useState()

    
    

    function getAll(){
        const user = JSON.parse(window.sessionStorage.getItem('person'))
        console.log(user)
        const storage = getStorage();
        const listRef = ref(storage, `${user.email}`);

        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    setAssignemnts((prevstate)=>[...prevstate,itemRef])
                });
            }).catch((error) => {
                // Uh-oh, an error occurred!
        });

    }

    function UploadAssignment(user,assign){
        
        const storage = getStorage();
        const fileRef = ref(storage,`${user}/${assign.name}`)

        uploadBytes(fileRef,assign).then((snapshot)=>{
            setAssignemnts((prevstate)=>
                [...prevstate,assign]
            )
        })
    }


    function DeleteAssignment(){
        
    }

    return(
        <AssignmentsContext.Provider value={{assignments, UploadAssignment, assignment, getAll}}>
            {children}
        </AssignmentsContext.Provider>
    )
}


export default AssignmentsContext;