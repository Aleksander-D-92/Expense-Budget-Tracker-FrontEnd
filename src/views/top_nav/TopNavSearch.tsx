import React, {ChangeEvent, useState, MouseEvent, CSSProperties} from "react";
import {Button, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {MediaType, MultiSearchResult, MultiSearchService} from "../../services/the_movie_db/MultiSearchService";
import {useHistory} from 'react-router-dom';


function TopNavSearch() {
    const [results, setResults] = useState<MultiSearchResult[]>([]);
    const [currentValue, setCurrentValue] = useState<string>();
    const history = useHistory();

    function getResults(event: ChangeEvent<{}>, value: string) {
        setCurrentValue(value);
        //this condition is used to no reset the value of 'response' state, when the final result is picked
        if (value.includes(' - ') || value === '' || value === undefined) {
            return;
        }
        let respObj = {
            id: 0,
            media_type: MediaType.movie,
            title: '',
            name: ''
        }
        //fetching results from the DB and casting them to MultiSearchResult
        MultiSearchService.getResults(value).then((e) => {
            let mapped = e.data.results.map(result => {
                switch (result.media_type) {
                    case MediaType.movie:
                        respObj = {
                            id: result.id,
                            title: result.title,
                            name: '',
                            media_type: MediaType.movie
                        }
                        return respObj;
                    case MediaType.tv:
                        respObj = {
                            id: result.id,
                            title: '',
                            name: result.name,
                            media_type: MediaType.tv
                        }
                        return respObj;
                    case MediaType.person:
                        respObj = {
                            id: result.id,
                            title: '',
                            name: result.name,
                            media_type: MediaType.person
                        }
                        return respObj;
                    default:
                        return respObj
                }
            });
            setResults(mapped);
        });
    }
    //this is used to properly visualize the suggestions
    function visualizeResult(obj: MultiSearchResult): string {
        if (obj.title === '') {
            return `${obj.name} - ${obj.media_type}`;
        } else {
            return `${obj.title} - ${obj.media_type}`;
        }
    }
    //used to redirect
    function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (currentValue === undefined) {
            return;
        }

        let strings = currentValue.split(' - ');
        switch (strings[1]) {
            case 'movie':
                results.find((r) => {
                    if (r.title === strings[0] && r.media_type === 'movie') {
                        history.push(`/movies/${r.id}`)
                    }
                });
                break;
            case 'tv':
                results.find((r) => {
                    if (r.name === strings[0] && r.media_type === 'tv') {
                        history.push(`/tv-shows/${r.id}`)
                    }
                });
                break;
            case 'person':
                results.find((r) => {
                    if (r.name === strings[0] && r.media_type === 'person') {
                        history.push(`/actors/${r.id}`)
                    }
                });
                break;
        }
    }

    return (
        <>
            <form className={'ml-auto mr-auto mt-4'}>
                <Autocomplete
                    id="combo-box-demo"
                    options={results}
                    getOptionLabel={(option) => visualizeResult(option)}
                    style={{width: 320}}
                    onInputChange={(a, b) => getResults(a, b)}
                    renderInput={(params) => <TextField {...params} label="Search movie, tv show, actor"/>}
                />
                <Button variant="contained"
                        color="secondary"
                        style={btnStyles}
                        onClick={(e: MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
                    Search
                </Button>
            </form>
        </>
    )
}

const btnStyles = {
    position: 'relative',
    left: '325px',
    top: '-35px',
} as CSSProperties
export {TopNavSearch}
