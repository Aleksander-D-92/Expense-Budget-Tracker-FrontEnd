import React from "react";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../config/redux/ReduxStore";
import {LeftNav} from "./LeftNav";


function LeftNavController() {
    const state = useSelector((state: ReduxState) => state);
    const authority = state.userDetails.authority;
    return (
        <>
            <LeftNav authority={authority}/>
        </>
    )
}

export {LeftNavController}
