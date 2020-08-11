import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client';
import { Tabs, Tab, Row, Col, Nav, Collapse, Button} from 'react-bootstrap';
import {
    Header
} from "../../Components/Index";
import Background from '../../movies/img/section/details.jpg';

const Details = ({
    match: {
        params: { id },
    },
} ) => {
    const [open, setOpen] = useState(false);
    const showId = parseInt(id);
    const GET_SHOW = gql`
    query ShowDetails($showId: Int!) {
        show(showId: $showId) {
            id
            name
            premiered
            image(size: ORIGINAL)
            genres
            rating
            runtime
            summary
            seasons {
            id
            number
            episodes
            }
            episodes{
                name
                id
                airdate
                airstamp
                airtime
                image_medium
                summary
            }
            crew {
            type
            person {
                name
                id
                image(size: MEDIUM)
            }
            }
        }
    }`; 
    const { data,
        error, fetchMore } = useQuery(
            GET_SHOW, ({ variables: { showId } })
        );
    
    if (data) {
        var loading = false;
        console.log(data.show)
    } else {
        var loading = true;
    }

    /* const iconClass = this.open
        ? 'fa-angle-double-down'
        : 'fa-angle-double-right'; */
    return (
        <>
            <Header></Header>  
            {   loading ? "Loading..." : data ?         
                    <section className="section section--details section--bg" style={{ backgroundImage: `url("${Background}")` }}>                        
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                <h1 className="section__title">{data.show.name}</h1>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="card1 card--details">
                                        <div className="row">
                                            <div className="col-12 col-sm-5 col-lg-6 col-xl-5">
                                                <div className="card__cover">
                                                <img src={data.show.image} alt=""/>
                                                <span className="card__rate card__rate--green">{data.show.rating}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-7 col-lg-6 col-xl-7">
                                                <div className="card__content">
                                                    <ul className="card__meta">
                                                        {/* <li><span>Director:</span> Vince Gilligan</li> */}
                                                        <li><span>Cast:</span>                                                         
                                                        {
                                                            data.show.crew.map(function (crew , key) {
                                                                return <a href="#" key={key}>{crew.person.name }</a>
                                                            })
                                                        }                                                            
                                                        </li>
                                                        <li><span>Genre:</span> <a href="#">{data.show.genres.join(", ")}</a></li>
                                                        <li><span>Release year:</span> {data.show.premiered}</li>
                                                        <li><span>Running time:</span> {data.show.runtime}</li>
                                                    </ul>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="card__description">
                                    {data.show.summary.replace(/<(.|\n)*?>/g, '')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                : "No data"
            }

            <section className="content">
                <div className="content__head">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="content__title">Discover</h2>
						        {/* <ul className="nav nav-tabs content__tabs" id="content__tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Comments</a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Reviews</a>
                                    </li>
                                </ul> */}


                                <Tabs defaultActiveKey="home" className="nnav nav-tabs content__tabs">
                                    <Tab eventKey="home" value='1' title="Seasons" className="nav-item active" style={{ marginTop: "5px"}}>
                                        <div className="we">
                                            <div className="c">
                                                <div className="comments">
                                                    {
                                                        loading ? "Loading..." : data ?
                                                        <table className="table table-dark">
                                                            <tbody>
                                                                {
                                                                    data.show.seasons.map(function (season, key) {
                                                                        return <tr key={key}>
                                                                            <td>Season {season.number}</td>
                                                                            <td>Episodes {season.episodes}</td>
                                                                        </tr>
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table> : "No data"
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="episodes" value='1' title="Episodes" style={{ marginTop: "5px" }}>
                                        <div className="comments">
                                            {
                                                loading ? "Loading..." : data ?
                                                    <table className="table table-dark">
                                                        <tbody>
                                                            {
                                                                data.show.episodes.map(function (episode, key) {
                                                                    return <tr key={key}>
                                                                        <td>Name: {episode.name}</td>
                                                                        <td>Air Date: {episode.airdate}</td>
                                                                        <td>Air Time: {episode.airtime}</td>
                                                                    </tr> 
                                                                })
                                                            }
                                                        </tbody>
                                                    </table> : "No data"
                                            }
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
        </>
    );
};

export default Details;