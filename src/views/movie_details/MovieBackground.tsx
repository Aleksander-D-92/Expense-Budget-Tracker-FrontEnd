import React, {useEffect, useState} from "react";
import {MovieDetails} from "../../services/the_movie_db/MovieService";
import {Card, CardMedia, Grid, Typography} from "@material-ui/core";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

interface Props {
    movieDetails?: MovieDetails
}

function MovieBackground(props: Props) {
    const [visible, setVisible] = useState<boolean>(true)
    useEffect(() => {
        setVisible(false)
    }, [])

    const imageBasePath = 'https://image.tmdb.org/t/p/original';
    return (
        <>
            {/*input is here to fix autofocus bug*/}
            <input type="text" autoFocus={true} style={{display: (visible) ? 'block' : 'none'}}/>
            <Grid container={true} justify={'center'}>
                <Grid item={true} xs={12} md={12}>
                    <Card elevation={8}>
                        <CardMedia
                            id={`${props.movieDetails?.id}`}
                            style={{height: 800}}
                            image={imageBasePath + props.movieDetails?.backdrop_path}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                            }} className={'backgroundDivForImage'}>
                            </div>

                            <div className={'movieDetailsTextProps'}>
                                <Typography variant="h4">
                                    {props.movieDetails?.title}
                                </Typography>
                                <Typography variant="h5">
                                    Genres: {props.movieDetails?.genres.map(genre => genre.name).join(`, `)} <br/>
                                    Rating: {props.movieDetails?.vote_average} {props.movieDetails !== undefined ?
                                    <ReactStars style={{display: 'inline-block'}}
                                                count={10}
                                                size={30}
                                                value={props.movieDetails.vote_average}
                                                activeColor="#ffd700"
                                    /> : ''}
                                </Typography>
                                <img src={`https://image.tmdb.org/t/p/w342${props.movieDetails?.poster_path}`}
                                     style={{position: 'relative', bottom: 200, left: -160}} height={200}
                                     width={150}/>
                            </div>
                        </CardMedia>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {MovieBackground}
