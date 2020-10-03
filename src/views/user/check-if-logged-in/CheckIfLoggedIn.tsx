import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {userDetailsAction, userLoggedInAction} from "../../../config/redux/User";
import {useLazyQuery} from "@apollo/client";
import {
    AllFavoritesByUserResp,
    AllFavoritesByUserVars,
    GET_FAVORITES_BY_USERID
} from "../../../services/apollo/queries/FavoriteQueries";
import {addFavoriteAction} from "../../../config/redux/Favorites";

function CheckIfLoggedIn() {
    const dispatch = useDispatch();
    const [getFavorites, {data}] = useLazyQuery<AllFavoritesByUserResp, AllFavoritesByUserVars>(GET_FAVORITES_BY_USERID);
    const devUrl = 'http://localhost:3000/'
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token !== null && token !== undefined) {
            let jwtPayload = JSON.parse(atob(token.split('.')[1])); //parse the JWT payload to JSON object
            dispatch(userLoggedInAction());
            dispatch(userDetailsAction({
                    userId: jwtPayload.id,
                    username: jwtPayload.sub,
                    authority: jwtPayload.authorities,
                    exp: jwtPayload.exp,
                    authorizationHeader: `Bearer ${token}`
                }
            ));
            if (window.location.href !== devUrl) {
                getFavorites({
                    variables: {
                        id: jwtPayload.id
                    }
                })
            }
        }
    }, [])
    useEffect(() => {
        if (data !== undefined && data !== null) {
            data.allFavoritesByUser.forEach((f) => {
                dispatch(addFavoriteAction(f));
            })
        }
    }, [data, dispatch])

    return (
        <>
        </>
    )
}

export {CheckIfLoggedIn}
