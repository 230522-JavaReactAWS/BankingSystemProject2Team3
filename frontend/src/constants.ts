let apiURL = '';

if (process.env.NODE_ENV === 'development') {
    //If you have a different local host # feel free to change this link on your end
    apiURL = 'http://localhost:8080';
} else {
    //Railway link will be placed here after deploying the site
    apiURL = "HOSTED_URL_HERE";
}

//Example Use: axios.get(`${baseURL}/item/`) etc
//Use it in place of the root directory
export const baseURL = apiURL;