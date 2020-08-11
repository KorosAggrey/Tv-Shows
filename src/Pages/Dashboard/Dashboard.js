import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  Link
} from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import { useForm } from "react-hook-form";


import config from "../../config";
import {
    Header
} from "../../Components/Index";
import "bootstrap/dist/css/bootstrap.css";

const Dashboard = () => {
  const [dashboard, searchTerm,setSearchTerm , setDashboard] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  
  const history = useHistory();

  const logout = () => {
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");
    /* eslint-enable */
    if (toLogout) {
      localStorage.clear();
      history.push("/login");
    }
  };

    const GET_SHOWS = gql`
    query ShowList {
      shows(page: 0) {
        id
        name
        premiered
        image(size: MEDIUM)
        genres
        rating
        summary
      }
    }
    `;
    

    const { data,
        loading,
        error, fetchMore } = useQuery(
        GET_SHOWS
    );

    

    //if (loading) return <Loading />;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
  const activePage = 1;

  /* useEffect(() => {
    fetch(`${config.baseUrl}/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(({ error, data }) => {
        setDashboard(data);
      });
  }, []); */

  const onSubmit = (data, e) => {
    e.preventDefault();
    history.push("movies/library?q=" + data.search);
  };
 

  
  return (
    <>
        <Header></Header>
        <section className="home home--bg">
          
          <div className="container">
            <div className="row">
              <div className="col-12">
                
              <div className="filter">
                <div className="filter__content">
                  <div className="filter__items">
                    <form className="header__search" onSubmit={handleSubmit(onSubmit)}>
                     {/*  <input className="header__search-input" type="text" placeholder="Search Tv Show ..." style={{ width: '1276px'}} /> */}
                      <input
                        className='header__search-input'
                        placeholder='Search Tv Show'
                        type='text'
                        name="search"
                        style={{ width: '1276px' }}
                        ref={register({
                          required: {
                            value: true,
                            message: "Please Search",
                          }
                        })}
                        //ref={input => (search = input)}
                        //onChange={handleInputChange}
                      />
                      <button className="header__search-button" type="submit">
                        <i className="icon ion-ios-search"></i>
                      </button>
                      <button className="header__search-close" type="button">
                        <i className="icon ion-md-close"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>


              <h1 className="content__title"><b>NEW SHOWS</b></h1>
              </div>
                  
                  <div className="row">
                    
                    {
                      data.shows.map((show, index) => (

                        <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={index} style={{ marginTop: `3px` }}>
                            <div className="card__cover">
                              <img src={show.image} alt=""/>
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
                      ))} 

                  </div>
                </div>
              </div>
              <div className="col-12">
              
                <ul className="paginator">
            {/* <Pagination
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              onChange={handlePageChange.bind(this)}
            /> */}
                  <li className="paginator__item paginator__item--prev">
                    <a href="#"><i className="icon ion-ios-arrow-back"></i></a>
                  </li>
                  <li className="paginator__item"><a href="#">1</a></li>
                  <li className="paginator__item paginator__item--active"><a href="#">2</a></li>
                  <li className="paginator__item"><a href="#">3</a></li>
                  <li className="paginator__item"><a href="#">4</a></li>
                  <li className="paginator__item paginator__item--next">
                    <a href="#"><i className="icon ion-ios-arrow-forward"></i></a>
                  </li>
                </ul>
              </div>
            </section>
    </>
  );
};

export default Dashboard;