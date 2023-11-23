import{useState} from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const data={
        "username":"sa",
        "password":"",
        "role":"student",
        "id":"id",
 
    }
    const[state,setState]=useState(data);

    const update=(username,password,role,id)=>{
        setState({
            "username":username,
            "password":password,
            "role":role,
            "id":id,
        })
    }
    return(
        <NoteContext.Provider value={{state:state,update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;