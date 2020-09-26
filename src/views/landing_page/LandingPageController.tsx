import React, {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import {Button, Paper} from "@material-ui/core";
import {MovieService} from "../../services/MovieService";


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
        MovieService.getDetails(100).then((e) => {
            console.log(e.data);
        })
        MovieService.getPopular(1).then((e) => {
            // console.log(e.data);
        })
        MovieService.getTopRated(1).then((e) => {
            // console.log(e.data);
        })
        MovieService.getUpComing(1).then((e) => {
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
