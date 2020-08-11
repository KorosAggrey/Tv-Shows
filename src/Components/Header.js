import React from "react";
import { Link } from "react-router-dom";

export function Header(){

    var user = localStorage.getItem("tvShows");
    var user_ = JSON.parse(user)
    //console.log(user_)
    return(
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="header__content">
                            <a href="index.html" className="header__logo">
                                <img src="img/logo.svg" alt="" />
                            </a>
                            <ul className="header__nav">
                                <li className="header__nav-item">
                                    <a className="header__nav-link" href="#">
                                        Tv Shows
                                    </a>
                                    <Link className="card__play" to ={""}>Tv Shows</Link>
                                </li>
                            </ul>
                            <div className="header__auth">
                                {
                                    user ? 
                                    <a className="header__sign-in">
                                        <i className="icon ion-ios-log-in"></i>
                                            <span>{user_.user.first_name }</span>
                                    </a>
                                    :
                                        <Link className="header__sign-in" to={"/login"}>
                                            <i className="icon ion-ios-log-in"></i>
                                            <span>sign in</span>
                                        </Link>
                                }
                                
                            </div>
                            <button className="header__btn" type="button">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

