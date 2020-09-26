import React from "react";
import Carousel from "react-multi-carousel";
import {Movie} from "../../services/the_movie_db/MovieService";
import {ImageContainer} from "./ImageContainer";

interface Props {
    movies?: Movie[]
}

function SmallCarousel(props: Props) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 5
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };
    return (
        <>
            <Carousel responsive={responsive} >
                {props.movies !== undefined ? props.movies.map(movie => {
                    return <ImageContainer movie={movie}/>
                }) : ''}
            </Carousel>;

        </>
    )
}

export {SmallCarousel}
