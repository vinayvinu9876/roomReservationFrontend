const host = "http://localhost:8080";

const buildUrl = (path) =>{
    return `${host}/${path}`;
}

module.exports = buildUrl;