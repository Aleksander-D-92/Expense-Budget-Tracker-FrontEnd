import React, {MouseEvent} from "react";
import {Avatar, Button, Card, CardContent, CardHeader, CardMedia, Grid, Tooltip, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Genre, Movie} from "../../services/the_movie_db/MovieService";
import {formatDate} from "../../shared/utils/functions";
import {useHistory} from "react-router-dom";
import Carousel from "react-multi-carousel";


interface Props {
    movies?: Movie[]
    genres?: Genre[]
}


function BigCarousel(props: Props) {
    const arr = ['rgba(255,99,132,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)']
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

    function redirect(e: MouseEvent) {
        history.push(`/movies/${e.currentTarget.id}`)
    }

    function genreName(id: number): string {
        let genre = props.genres?.find((genre: Genre) => genre.id === id);
        return genre?.name || '';
    }

    return (
        <>
            <Carousel
                // autoPlay={true}
                responsive={responsive}
                showDots={true}>
                {props.movies !== undefined ? props.movies.map(movie => {
                    return <Grid container={true} justify={'center'}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2'} elevation={8}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipes"
                                                style={{backgroundColor: arr[Math.floor(Math.random() * arr.length) + 1]}}>
                                            {movie.title.slice(0, 1).toUpperCase()}
                                        </Avatar>
                                    }
                                    action={
                                        <Button aria-label="settings">
                                            Add to Favorites
                                            <AddIcon/>
                                        </Button>
                                    }
                                    titleTypographyProps={{variant: 'h5'}}
                                    title={movie.title}
                                    subheader={`Release Date: ${formatDate(movie.release_date)}`}
                                />
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
                                            <Typography variant="h4">
                                                Top Rated
                                            </Typography>
                                            <Typography variant="h3">
                                                {movie.title}
                                            </Typography>
                                            <Typography variant="h4">
                                                {genreName(movie.genre_ids[0])} | Rating: {movie.vote_average}
                                            </Typography>
                                        </div>
                                    </CardMedia>
                                </Tooltip>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {movie.overview}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                }) : ''}
            </Carousel>
        </>
    )
}


export {BigCarousel}
