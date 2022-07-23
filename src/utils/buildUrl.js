const host = "http://localhost:8080";
//const host = "http://192.168.1.98:8082";

const buildUrl = (path) =>{
    return `${host}/${path}`;
}

module.exports = buildUrl;