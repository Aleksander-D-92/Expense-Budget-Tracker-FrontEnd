import React from "react";
import {Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {MovieDetails} from "../../services/the_movie_db/MovieService";
import {formatDate} from "../../shared/utils/functions";

interface Props {
    movieDetails?: MovieDetails
}

function MovieDescription(props: Props) {
    return (
        <>
            <Grid container={true} justify={'center'}>
                <Grid xs={11}>
                    <Card elevation={10} className={'mt-2'}>
                        <CardHeader
                            title="Movie Info"
                        />
                        <CardContent>
                            <Typography variant={'h6'}>
                                Summary
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {props.movieDetails?.overview}
                            </Typography>
                            <Typography variant={'h6'}>
                                Release Date
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {formatDate(props.movieDetails?.release_date)}
                            </Typography>
                            <Typography variant={'h6'}>
                                Production Companies
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {props.movieDetails?.production_companies.map(company => company.name).join(", ")}
                            </Typography>
                            <Typography variant={'h6'}>
                                Production Countries
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {props.movieDetails?.production_countries.map(country => country.name).join(", ")}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {MovieDescription}
