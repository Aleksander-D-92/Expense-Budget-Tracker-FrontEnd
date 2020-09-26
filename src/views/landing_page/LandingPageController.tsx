import React, {useEffect, useState} from "react";
import {AxiosResponse} from 'axios'
import Carousel from "react-material-ui-carousel";
import {Button, Paper} from "@material-ui/core";
import {MovieCollectionResponse, movieDBService, MovieDetails} from "../../services/MovieService";


interface Props {

}

function LandingPageController(props: Props) {
    const [cards, setCards] = useState<Array<any>>();
    const items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]
    useEffect(() => {
        movieDBService.getDetails(100).then((e: AxiosResponse<MovieDetails>) => {
            console.log(e.data);
        })
        movieDBService.getPopular(1).then((e: AxiosResponse<MovieCollectionResponse>) => {
            // console.log(e.data);
        })
        movieDBService.getTopRated(1).then((e: AxiosResponse<MovieCollectionResponse>) => {
            // console.log(e.data);
        })
        movieDBService.getUpComing(1).then((e: AxiosResponse<MovieCollectionResponse>) => {
            // console.log(e.data);
        })
    }, []);
    return (
        <>
            <Carousel>
                {
                    items.map((item, i) => <Item key={i} item={item}/>)
                }
            </Carousel>
        </>
    )
}

export {LandingPageController}

function Item(props: any) {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
