import React from "react";
import {Avatar, Button, Card, CardContent, CardHeader, CardMedia, Grid, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Movie} from "../../services/the_movie_db/MovieService";
import {formatDate} from "../../shared/utils/functions";


interface Props {
    movie: Movie
}

function ImageContainer(props: Props) {
    const arr = ['rgba(255,99,132,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)']
    const imageBasePath = 'https://image.tmdb.org/t/p/original';
    return (
        <>
            <Grid container justify="center">
                <Grid xs={12} md={12}>
                    <Card className={'mr-5'}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipes"
                                        style={{backgroundColor: arr[Math.floor(Math.random() * arr.length) + 1]}}>
                                    {props.movie.title.slice(0, 1).toUpperCase()}
                                </Avatar>
                            }
                            action={
                                <Button aria-label="settings">
                                    Add to Favorites
                                    <AddIcon/>
                                </Button>
                            }
                            title={props.movie.title}
                            subheader={`Release Date: ${formatDate(props.movie.release_date)}`}
                        />
                        <CardMedia
                            style={{height: 800}}
                            image={imageBasePath + props.movie.backdrop_path}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.movie.overview}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {ImageContainer}
