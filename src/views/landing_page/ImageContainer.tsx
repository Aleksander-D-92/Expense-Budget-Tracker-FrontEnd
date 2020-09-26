import React from "react";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    createStyles,
    Grid,
    Theme,
    Typography
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Movie} from "../../services/the_movie_db/MovieService";
import {formatDate} from "../../shared/utils/functions";
import Carousel from "react-material-ui-carousel";
import {makeStyles} from "@material-ui/core/styles";


interface Props {
    movies?: Movie[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        title: {
            fontSize: 25
        },
    }),
);

function ImageContainer(props: Props) {
    const styles = useStyles();
    const arr = ['rgba(255,99,132,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)']
    const imageBasePath = 'https://image.tmdb.org/t/p/original';
    return (
        <>
            <Carousel autoPlay={true} animation={'slide'} timeout={700}>
                {props.movies?.map(movie => {
                    return <Grid container={true} justify={'center'}>
                        <Grid item={true} xs={12} md={11}>
                            <Card className={'mt-2'} elevation={5}>
                                <CardHeader className={styles.title}
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
                                            titleTypographyProps={{variant:'h5'}}
                                            title={movie.title}
                                            subheader={`Release Date: ${formatDate(movie.release_date)}`}
                                />
                                <CardMedia
                                    style={{height: 800}}
                                    image={imageBasePath + movie.backdrop_path}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {movie.overview}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                })}
            </Carousel>

        </>
    )
}

export {ImageContainer}
