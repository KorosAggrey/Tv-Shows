import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'

import styles from "./Login.module.css";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import config from "../../config";
import Background from '../../movies/img/section/section.jpg';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();

    const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        }
    }
    `

  const onSubmit = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    });
      var request = {
        'request':{
          request_id: 1,
          data: {
              identity: data.email,
              password: data.password
          }
        }}
      fetch(`https://videos.chrystal.co.ke/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
        body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then(({ error, data }) => {
          console.log(data.access_token)
        setMessage({
          data: error || "Logged in successfully, redirecting...",
          type: error ? "alert-danger" : "alert-success",
        });
        !error &&
          setTimeout(() => {
              localStorage.setItem("tvShows", JSON.stringify(data));
              history.push("/dashboard");
          }, 3000);

        !error && e.target.reset();
      });
  };

    return (
        <div className="sign section--bg" style={{ backgroundImage: `url("${Background}")` }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">                        
                        <div className="sign__content">
                            
                            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="sign__form">
                                {message && (
                                    <div
                                        className={`alert fade show d-flex ${message.type}`}
                                        role="alert"
                                    >
                                        {message.data}
                                        <span
                                            aria-hidden="true"
                                            className="ml-auto cursor-pointer"
                                            onClick={() => setMessage(null)}
                                        >
                                            &times;
                                </span>
                                    </div>
                                )}
                                <div className="sign__group">
                                    <input
                                        id="inputForEmail"
                                        name="email"
                                        type="email"
                                        value="aggreykoros04@gmail.com"
                                        className="sign__input"
                                        aria-describedby="Enter email address"
                                        placeholder="Enter email address"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Please enter your email address",
                                            },
                                        })}
                                    />
                                    {errors.name && (
                                        <span className={`${styles.errorMessage} mandatory`}>
                                            {errors.name.message}
                                        </span>
                                    )}
                                </div>
                                <div className="sign__group">
                                    <input
                                        type="password"
                                        name="password"
                                        value="energon123"
                                        className="sign__input"
                                        id="inputForPassword"
                                        value ="ZW5lcmdvbjEyMw%3D%3D"
                                        placeholder="Enter password"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Please enter password",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <span className={`${styles.errorMessage} mandatory`}>
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>
                                <button type="submit" className="sign__btn">
                                    Submit
                            </button>
                                {/* <span className="sign__text">Don't have an account? <Link to="/register">Sign Up!</Link></span> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;