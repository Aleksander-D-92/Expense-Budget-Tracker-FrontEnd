import React, {useEffect, useState, ChangeEvent} from "react";
import {Grid, Typography, Tab, Tabs} from "@material-ui/core";
import {MovieCollection, MovieCollectionWithDates, MovieService} from "../../services/the_movie_db/MovieService";
import {BigCarousel} from "./BigCarousel";
import {PageLoading} from "./PageLoading";
import {SmallCarousel} from "./SmallCarousel";
import ScrollAnimation from "react-animate-on-scroll";
import {TabPanel} from "@material-ui/lab";

function LandingPageController() {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [topRated, setTopRated] = useState<MovieCollection>();
    const [upComing, setUpComing] = useState<MovieCollection>();
    const [popular, setPopular] = useState<MovieCollection>();
    const [nowPlaying, setNowPlaying] = useState<MovieCollectionWithDates>();
    useEffect(() => {
        MovieService.getTopRated(1).then((e) => {
            setTopRated(e.data);
        });
        MovieService.getUpComing(1).then((e) => {
            setUpComing(e.data);
        });
        MovieService.getPopular(1).then((e) => {
            setPopular(e.data)
        });
        MovieService.getNowPlaying(1).then((e) => {
            setNowPlaying(e.data);
            console.log(e.data);
        })
    }, []);

    function handleChange(event: ChangeEvent<{}>, newValue: number) {
        setSelectedTab(newValue)
    }

    return (
        <>
            <Grid container={true} justify="center">
                <Grid item={true} xs={12} md={12}>
                    <PageLoading loading={topRated === undefined || upComing === undefined || popular === undefined}/>

                    <Typography align={'center'} variant={'h3'} className={'mt-2'}>Top Rated</Typography>
                    <ScrollAnimation animateIn={'fadeIn'}>
                        <BigCarousel movies={topRated?.results}/>
                    </ScrollAnimation>

                    <Tabs value={selectedTab}
                          onChange={handleChange}
                          centered={true}
                          aria-label="movies or tv shows">
                        <Tab label="Movies" className={'mr-5'}/>
                        <Tab label="TV Shows"/>
                    </Tabs>
                    {selectedTab === 0 && <>
                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>Upcoming</Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallCarousel movies={upComing?.results}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>Popular</Typography>
                        <ScrollAnimation animateIn={'fadeInRight'}>
                            <SmallCarousel movies={popular?.results}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>Now Playing in
                            Theatres</Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallCarousel movies={nowPlaying?.results}/>
                        </ScrollAnimation>
                    </>}
                    {selectedTab === 1 && <>second</>}
                </Grid>
            </Grid>
        </>
    )
}

export {LandingPageController}
