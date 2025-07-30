import axios from "axios";

const getBaseUrl = () => "https://cu2-pa-b13-express-pip.onrender.com";

export const getFictionBooks = (queryParams) =>
  axios
    .get(`${getBaseUrl()}/fiction-books${queryParams}`)
    .then((res) => res.data);

export const getNonFictionBooks = (queryParams) =>
  axios
    .get(`${getBaseUrl()}/non-fiction-books${queryParams}`)
    .then((res) => res.data);
