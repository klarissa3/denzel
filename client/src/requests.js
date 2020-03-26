const APIURL = "http://localhost:9292";
const axios = require("axios");

export const getRandomMovie = () => axios.get(`${APIURL}/movies`);