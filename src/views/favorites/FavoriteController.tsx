import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {ReduxState} from "../../config/redux/ReduxStore";
import {Card, Grid} from "@material-ui/core";
import {useQuery} from "@apollo/client";
import {
    GET_FAVORITES_COUNT_BY_USERID,
    GetFavoritesCountResp,
    GetFavoritesCountVars
} from "../../services/apollo/queries/FavoriteQueries";
import {FavoriteType} from "../../services/apollo/mutations/FavoriteMutations";


function FavoriteController() {
    const history = useHistory();
    const userDetails = useSelector((state: ReduxState) => state.userDetails);
    const userId = userDetails.userId;
    if (userId === undefined || userId === null) {
        history.push("/users/login")
    }
    const [favoriteMovies, setFavoriteMovies] = useState(
        {
            type: FavoriteType.MOVIE,
            count: 0
        });
    const [favoriteTV, setFavoriteTV] = useState(
        {
            type: FavoriteType.TV,
            count: 0
        });
    const [favoriteActor, setFavoriteActor] = useState(
        {
            type: FavoriteType.ACTOR,
            count: 0
        });

    const {data, loading} = useQuery<GetFavoritesCountResp, GetFavoritesCountVars>(GET_FAVORITES_COUNT_BY_USERID, {
        variables: {
            id: userId
        }
    });
    useEffect(() => {
        if (data !== undefined) {
            data.countFavoriteByUser.forEach((e) => {
                switch (e.favoriteType) {
                    case FavoriteType.MOVIE:
                        setFavoriteMovies({type: FavoriteType.MOVIE, count: e.count});
                        break;
                    case FavoriteType.TV:
                        setFavoriteTV({type: FavoriteType.TV, count: e.count});
                        break;
                    case FavoriteType.ACTOR:
                        setFavoriteActor({type: FavoriteType.ACTOR, count: e.count});
                        break;
                }
            })
        }
    }, [data]);

    return (
        <Grid container={true} justify={'center'} spacing={5}>

            <Grid item={true} xs={11} md={3}>
                <Card elevation={10} className={'mt-3'}>
                    <h1>Movies</h1>
                </Card>
            </Grid>

            <Grid item={true} xs={11} md={3}>
                <Card elevation={10} className={'mt-3'}>
                    <h1>TV</h1>
                </Card>
            </Grid>

            <Grid item={true} xs={11} md={3}>
                <Card elevation={10} className={'mt-3'}>
                    <h1>Actors</h1>
                </Card>
            </Grid>

        </Grid>
    )
}

export {FavoriteController}
