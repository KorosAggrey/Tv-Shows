import React, { useState } from "react";
import { useLocation } from 'react-router';
import queryString from 'query-string';
import {
    BrowserRouter as Router,
    Switch,
    useHistory,
    Link
} from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import Background from '../../movies/img/section/section.jpg';
import no_image from '../../movies/img/no-image.png';
import {
    Header
} from "../../Components/Index";


const Search = () => {
    const location = useLocation();
    const value = queryString.parse(location.search);
    const name = value.q;
    const GET_SHOWS = gql`
        query Search($name: String!) {
            search(name: $name) {
                id
                name
                premiered
                image(size: MEDIUM)
                genres
                rating
                summary
            }
        }`; 

    const { data,
        error, fetchMore } = useQuery(
            GET_SHOWS, ({ variables: { name } })
    );
    if (data){
        var loading = false;
        console.log(data.search)
    }else{
        var loading = true;
    }
    
    return (
         <>
        <Header></Header>
        <section className="section section--first section--bg" style={{ backgroundImage: `url("${Background}")` }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section__wrap">
                            <h2 className="section__title">Search results for "{name}"</h2>
					</div>
                    </div>
                </div>
            </div>
        </section>
        <div className="catalog">
            <div className="container">
                <div className="row">

                    {
                        loading ? "Loading..." : data ?
                        
                        data.search.map((show, index) => (
                            <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={index}>
                                <div className="card1">
                                    <div className="card__cover">
                                        <img src={show.image ? show.image: no_image} alt={show.name}/>
                                        {/* <a href="#" className="card__play">
                                            <i className="icon ion-ios-play"></i>
                                        </a> */}
                                        <Link className="card__play" to={'/details/' + show.id}> <i className="icon ion-ios-play"></i></Link>
                                        <span className="card__rate card__rate--green">{show.rating}</span>
                                    </div>
                                    <div className="card__content">
                                        <h3 className="card__title"><a href="#">{show.name}</a></h3>
                                        <span className="card__category">
                                            <a href="#">{show.genres.join(", ")}</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))

                        :"No data with that search"
                    }

                </div>
            </div>
        </div>
        </>
    );
}

export default Search;