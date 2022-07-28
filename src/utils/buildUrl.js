//const host = "http://localhost:8080";
const host = "http://localhost/roomsReservation";

const buildUrl = (path) =>{
    return `${host}/${path}`;
}

module.exports = buildUrl;