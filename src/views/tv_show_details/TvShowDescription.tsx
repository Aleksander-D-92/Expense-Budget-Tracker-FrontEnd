import React, {useEffect, useState} from "react";
import {TVShowDetails} from "../../services/the_movie_db/TvShowsService";
import {Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {formatDate} from "../../shared/utils/functions";

interface Props {
    tvShowDetails?: TVShowDetails
}

function TvShowDescription(props: Props) {
    const [totalEpisodes, setTotalEpisodes] = useState<number>(0)
    useEffect(() => {
        let count = 0;
        props.tvShowDetails?.seasons.forEach(e => {
            count += e.episode_count;
        })
        setTotalEpisodes(count);
    }, [props.tvShowDetails])
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
                                {props.tvShowDetails?.overview}
                            </Typography>
                            <Typography variant={'h6'}>
                                Release Date
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {formatDate(props.tvShowDetails?.first_air_date)}
                            </Typography>
                            <Typography variant={'h6'}>
                                Production Companies
                            </Typography>
                            <Typography gutterBottom={true} color="textSecondary">
                                {props.tvShowDetails?.production_companies.map(company => company.name).join(", ")}
                            </Typography>
                            <Typography variant={'h6'} gutterBottom={true}>
                                Number of Seasons: {props.tvShowDetails?.seasons.length}
                            </Typography>
                            <Typography variant={'h6'} gutterBottom={true}>
                                Total of Episodes: {totalEpisodes}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export {TvShowDescription}
