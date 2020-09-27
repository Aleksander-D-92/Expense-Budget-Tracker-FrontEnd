import React, {ChangeEvent, useEffect, useState} from "react";
import {Grid, Tab, Tabs, Typography} from "@material-ui/core";
import {Genre, MovieCollection, MovieCollectionWithDates, MovieService} from "../../services/the_movie_db/MovieService";
import {BigCarousel} from "./BigCarousel";
import {PageLoading} from "./PageLoading";
import {SmallMovieCarousel} from "./SmallMovieCarousel";
import ScrollAnimation from "react-animate-on-scroll";
import {TvShowCollection, TvShowsService} from "../../services/the_movie_db/TvShowsService";
import {SmallTvShowCarousel} from "./SmallTvShowCarousel";

function LandingPageController() {
    //tab bar
    const [selectedTab, setSelectedTabMovies] = useState<number>(0);
    //genres
    const [genres, setGenres] = useState<Genre[]>();
    //movies
    const [topRatedMovies, setTopRatedMovies] = useState<MovieCollection>();
    const [upComingMovies, setUpComingMovies] = useState<MovieCollection>();
    const [popularMovies, setPopularMovies] = useState<MovieCollection>();
    const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieCollectionWithDates>();
    //tv shows
    const [topRatedTvShows, setTopRatedTvShows] = useState<TvShowCollection>();
    const [popularTvShows, setPopularTvShows] = useState<TvShowCollection>();
    const [onTheAirTvShows, setOnTheAirTvShows] = useState<TvShowCollection>();

    useEffect(() => {
        //genres
        MovieService.getGenres().then((e) => {
            setGenres(e.data.genres);
        })
        //movies
        MovieService.getTopRated(1).then((e) => {
            setTopRatedMovies(e.data);
        });
        MovieService.getUpComing(1).then((e) => {
            setUpComingMovies(e.data);
        });
        MovieService.getPopular(1).then((e) => {
            setPopularMovies(e.data)
        });
        MovieService.getNowPlaying(1).then((e) => {
            setNowPlayingMovies(e.data);
        });

        //Tv Shows
        TvShowsService.getTopRated(1).then((e) => {
            setTopRatedTvShows(e.data);
        });
        TvShowsService.getPopular(1).then((e) => {
            setPopularTvShows(e.data)
        });
        TvShowsService.getOnTheAir(1).then((e) => {
            setOnTheAirTvShows(e.data)
        });
    }, []);


    function handleChange(event: ChangeEvent<{}>, newValue: number) {
        setSelectedTabMovies(newValue)
    }

    return (
        <>
            <Grid container={true} justify="center">
                <Grid item={true} xs={12} md={12}>
                    <PageLoading
                        loading={topRatedMovies === undefined || upComingMovies === undefined || popularMovies === undefined}/>

                    {/*<Typography align={'center'} variant={'h3'} className={'mt-2'}>Top Rated</Typography>*/}
                    <BigCarousel movies={topRatedMovies?.results} genres={genres}/>
                    <Tabs value={selectedTab}
                          className={'mt-4 mb-2'}
                          onChange={handleChange}
                          centered={true}
                          aria-label="movies or tv shows">
                        <Tab style={{fontSize: '1.2em'}} label="Movies" className={'mr-5'}/>
                        <Tab style={{fontSize: '1.2em'}} label="TV Shows"/>
                    </Tabs>
                    {selectedTab === 0 &&
                    <>
                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>Upcoming</Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallMovieCarousel movies={upComingMovies?.results}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>Popular</Typography>
                        <ScrollAnimation animateIn={'fadeInRight'}>
                            <SmallMovieCarousel movies={popularMovies?.results}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                            Now Playing in Theatres</Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallMovieCarousel movies={nowPlayingMovies?.results}/>
                        </ScrollAnimation>
                    </>}
                    {selectedTab === 1 &&
                    <>
                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                            Top Rated
                        </Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallTvShowCarousel tvShows={topRatedTvShows?.results}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                            Popular
                        </Typography>
                        <ScrollAnimation animateIn={'fadeInRight'}>
                            <SmallTvShowCarousel tvShows={popularTvShows?.results}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                            Currently On The Air
                        </Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallTvShowCarousel tvShows={onTheAirTvShows?.results}/>
                        </ScrollAnimation>
                    </>}
                </Grid>
            </Grid>
        </>
    )
}

export {LandingPageController}
