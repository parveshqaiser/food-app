import React from "react";

import { useRouteError } from "react-router";

const FileNotFound =()=>{

    let pathError = useRouteError();
    console.log(pathError);

    return(
        <React.Fragment>
            <h1 className="text-xl text-center mt-3">{pathError.status} : Oops!! Requested Page {pathError.statusText}</h1>
        </React.Fragment>
    );
};

export default FileNotFound;