
import React, { useContext } from "react";
import userDetails from "../utils/userDetails";

const Contact = ()=>{

    let det = useContext(userDetails);
    // console.log(det.age);

    return(
        <React.Fragment>
            {/* <Header /> */}
            <h2>This is Contact Page</h2>
        </React.Fragment>
    )
}

export default Contact;

/*
this is how life cycle of hooks works
    first body, ==> if any function exist then function ==> inside jsx ==> useEffect==> body ==> if (any function) ==> function ==> jsx 


*/

