import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getRandomMovie } from "./requests";
import Card from "react-bootstrap/Card";
import "./Result.css";


function ResultsPage({}) {
    const [movie, setMovie] = useState([]);
    const [title, setName] = useState("");
    const [initialized, setInitialized] = useState(false);
    const getMovie = async () => {
      const response = await getRandomMovie();
      setMovie(response.data);
      //setName(response.data.title);
    };
    useEffect(() => {
      if (!initialized) {
        getMovie();
        setInitialized(true);
      }
    });
    return (
      <div className="results-page">
        <h1 className="center">Must Watch Movie </h1>
        {movie.map((d, i) => {
          return (
             
            <Card > 
              <div class="column">
               <img 
                src={d.poster}
                alt="new"/>
              </div>
              <div class="column1">
               
              <Card.Header className="title">{d.title}</Card.Header>  
              <br/>
              <Card.Title className="synopsis">Synopsis : </Card.Title>
              
              <Card.Body>
                <a class="syn"> {d.synopsis} </a>
                <br />
                <br />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <span class="fa fa-star checked"></span>
                <a>{d.rating}</a>
                <br />
                <br />
                <a className="btn btn-primary" href={d.link}>
                  Click to know more about the movie
                </a>
              </Card.Body>
        
              </div>
            </Card>
            
          );
        })}
      </div>
    );
  }
  export default withRouter(ResultsPage);