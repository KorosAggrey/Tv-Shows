import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";

import "./movies/css/bootstrap-reboot.min.css";
import "./movies/css/bootstrap-grid.min.css";
import "./movies/css/owl.carousel.min.css";
import "./movies/css/jquery.mCustomScrollbar.min.css";
import "./movies/css/nouislider.min.css";
import "./movies/css/ionicons.min.css";
import "./movies/css/plyr.css";
import "./movies/css/photoswipe.css";
import "./movies/css/default-skin.css";
import "./movies/css/main.css";
import * as serviceWorker from './serviceWorker';
import Routes from "./Routes";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */
// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint


ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>, 
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
