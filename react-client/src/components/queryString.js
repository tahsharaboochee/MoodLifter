//fast and easy way of parsing query strings in JavaScript to get the token

//grab the query string
const queryString = window.location.search;

//parse the query string's parameters
const urlParams = new URLSearchParams(queryString);

const access_token = urlParams.get('access_token');
return access_token;

export default queryString;
