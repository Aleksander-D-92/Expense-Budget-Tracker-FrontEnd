import React, {MouseEvent, useEffect, useState} from "react";
import {Card, CardMedia, Grid, LinearProgress, Tooltip, Typography} from "@material-ui/core";
import {Genre, Movie} from "../../services/the_movie_db/MovieService";
import {useHistory} from "react-router-dom";
import Carousel from "react-multi-carousel";


interface Props {
    movies?: Movie[]
    genres?: Genre[]
}


function BigCarousel(props: Props) {
    const [progressValue, setProgressValue] = useState<number>(1);
    const [visible, setVisible] = useState<boolean>(true);
    const history = useHistory();
    const imageBasePath = 'https://image.tmdb.org/t/p/original';
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 1
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 1
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };
    useEffect(() => {
        setVisible(false)
    }, []);
    function redirect(e: MouseEvent) {
        history.push(`/movies/${e.currentTarget.id}`)
    }

    function genreName(id: number): string {
        let genre = props.genres?.find((genre: Genre) => genre.id === id);
        return genre?.name || '';
    }

    function handleClick(e: number) {
        setProgressValue((e + 1) * 5);
    }

    return (
        <>
            <input type="text" autoFocus={true} style={{display: (visible) ? 'block' : 'none'}}/>
            <LinearProgress variant={'determinate'} color={'secondary'} value={progressValue}/>
            <Carousel beforeChange={(e) => handleClick(e)}
                      autoPlay={true}
                      responsive={responsive}>
                {props.movies !== undefined ? props.movies.map(movie => {
                    return <Grid container={true} justify={'center'} key={movie.id}>
                        <Grid item={true} xs={12} md={12}>
                            <Card elevation={8}>
                                <Tooltip title={"Double Click to see details"} placement={'top'} arrow={true}>
                                    <CardMedia
                                        id={`${movie.id}`}
                                        onDoubleClick={redirect}
                                        style={{height: 800}}
                                        image={imageBasePath + movie.backdrop_path}
                                    >
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                        }} className={'backgroundDivForImage'}>
                                        </div>
                                        <div className={'backgroundDivForImageText'}>
                                            <Typography variant="h5">
                                                Top Rated
                                            </Typography>
                                            <Typography variant="h4">
                                                {movie.title}
                                            </Typography>
                                            <Typography variant="h5">
                                                {genreName(movie.genre_ids[0])} | Rating: {movie.vote_average}
                                            </Typography>
                                        </div>
                                    </CardMedia>
                                </Tooltip>
                            </Card>
                        </Grid>
                    </Grid>
                }) : ''}
            </Carousel>
        </>
    )
}


export {BigCarousel}
