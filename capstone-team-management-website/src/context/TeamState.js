import{useState} from "react";

import TeamContext from "./TeamContext";

const TeamState=(props)=>{
    const data={
        "teamname":"",
        "leaderName":"",
        "id":"id",
        "members":"",
    }
    const[state,setState]=useState(data);

    const update=(teamname,leadername,members,id,facultyname)=>{
        setState({
            "teamname":teamname,
            "leaderName":leadername,
            "id":id,
            "members":members,
        })
    }
    return(
        <TeamContext.Provider value={{state:state,update:update}}>
            {props.children}
        </TeamContext.Provider>
    )
}
export default TeamState;