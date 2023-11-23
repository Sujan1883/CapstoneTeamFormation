import{useState} from "react";

import FacultyContext from "./FacultyContext";

const FacultyState=(props)=>{
    const data={
        "fullname":"",
        "fac_id":"",
        "domain":"",
    }
    const[state,setState]=useState(data);

    const update=(fullname,fac_id,domain)=>{
        setState({
        "fullname":fullname,
        "fac_id":fac_id,
        "domain":domain,
        })
    }
    return(
        <FacultyContext.Provider value={{state:state,update:update}}>
            {props.children}
        </FacultyContext.Provider>
    )
}
export default FacultyState;