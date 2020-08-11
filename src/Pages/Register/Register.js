import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"; // import useForm hooks
import Background from '../../movies/img/section/section.jpg';
import config from "../../config";
import { gql, useQuery } from '@apollo/client';

const Register = () => {
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState();

    const onSubmit = (data, e) => {
        setMessage({
            data: "Registration is in progress...",
            type: "alert-warning",
        });
        console.log(data)
        const GET_SHOW = gql`
            mutation SignUp($name: String!, $email: String!, $password: String!) {
                signup(name: $name, email: $email, password: $password) {
                    success
                    message
                    id
            }
        }`;

        /* const { data,
            error, fetchMore } = useQuery(
                GET_SHOW, ({})
        ); */

        /* fetch(`${config.baseUrl}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                const hasError = "error" in data && data.error != null;
                setMessage({
                    data: hasError ? data.error : "Registered successfully",
                    type: hasError ? "alert-danger" : "alert-success",
                });

                !hasError && e.target.reset();
            }); */
    };    

    return(
    <div className="sign section--bg" style={{ backgroundImage: `url("${Background}")`}}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="sign__content">
                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="sign__form">
                            <div className="sign__group">
                                <input
                                    id="inputForName"
                                    name="name"
                                    type="text"
                                    className="sign__input"
                                    aria-describedby="Enter your name"
                                    placeholder="Enter your name"
                                    ref={register({
                                        required: {
                                            value: true,
                                            message: "Please enter your name",
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters are allowed",
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: "Maximum 255 characters are allowed",
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
                                    id="inputForEmail"
                                    name="email"
                                    type="email"
                                    className="sign__input"
                                    aria-describedby="Enter email address"
                                    placeholder="Enter email address"
                                    ref={register({
                                        required: {
                                            value: true,
                                            message: "Please enter your email address",
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Enter a valid email address",
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters are allowed",
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: "Maximum 255 characters are allowed",
                                        },
                                    })}
                                />
                                    {errors.email && (
                                        <span className={`${styles.errorMessage} mandatory`}>
                                            {errors.email.message}
                                        </span>
                                    )}
							</div>

							<div className="sign__group">
                                <input
                                    type="password"
                                    name="password"
                                    className="sign__input"
                                    id="inputForPassword"
                                    placeholder="Enter password"
                                    ref={register({
                                        required: {
                                            value: true,
                                            message: "Please enter password",
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters are allowed",
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: "Maximum 255 characters are allowed",
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
                            <span className="sign__text">Already have an account? <Link to="/login">Sign in!</Link></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Register;