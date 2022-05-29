import { useState, createContext, useEffect } from "react";
import { getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import { auth } from "../../firebase";

const AssignmentsContext = createContext()


export function AssignmentsProvider({children}){
    const [assignments, setAssignemnts] = useState([])
    const [assignment, setAssignemnt] = useState()

    
    

    async function getAll(email){
        console.log(email)
        const storage = getStorage();
        const listRef = ref(storage, `${email}`);

        await listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    setAssignemnts((prevstate)=>[...prevstate,itemRef])
                });
            }).then(()=>{
                
            }).catch((error) => {
                // Uh-oh, an error occurred!
        });
        
        console.log(JSON.parse(window.sessionStorage.getItem('uploads')))
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

    function upDateAssignments(uploads){
        console.log('Updating assignments with: ',uploads)
        setAssignemnts(
            [uploads]
        )
       
    }

    function DeleteAssignment(){
        
    }

    return(
        <AssignmentsContext.Provider value={{assignments, UploadAssignment, assignment, getAll, upDateAssignments, setAssignemnts}}>
            {children}
        </AssignmentsContext.Provider>
    )
}


export default AssignmentsContext;