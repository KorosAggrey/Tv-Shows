import React from "react";

export function MovieList() {

    
    return (
        <section className="home home--bg">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="home__title"><b>NEW ITEMS</b> OF THIS SEASON</h1>

                        <button className="home__nav home__nav--prev" type="button">
                            <i className="icon ion-ios-arrow-round-back"></i>
                        </button>
                        <button className="home__nav home__nav--next" type="button">
                            <i className="icon ion-ios-arrow-round-forward"></i>
                        </button>
                    </div>
                    <div className="col-12">
                        <div className="owl-carousel home__carousel">
                            <div className="card card--big">
                                <div className="card__cover">
                                    <img src="img/covers/cover.jpg" alt=""/>
                                    <a href="#" className="card__play">
                                        <i className="icon ion-ios-play"></i>
                                    </a>
                                    <span className="card__rate card__rate--green">8.4</span>
                                </div>
                                <div className="card__content">
                                    <h3 className="card__title"><a href="#">I Dream in Another Language</a></h3>
                                    <span className="card__category">
                                        <a href="#">Action</a>
                                        <a href="#">Triler</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

