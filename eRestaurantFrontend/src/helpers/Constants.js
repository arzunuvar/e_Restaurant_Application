const CONSTANTS = {
    ERESTAURANT_BASE_URL: "http://localhost:60019/api/",
    BASE_URL:"http://localhost:3000/",
    LANGUAGE_SETTINGS: {
        DEFAULT_LANGUAGE: "tr-TR",
        TR: "tr-TR",
        EN: "en-US",
        AR: "ar-AR"
    },
}

export const CallMethods = {
    POST: "POST",
    GET: "GET"
}

export const DefaultCallProps = {
    cache: "no-cache",
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',//Cache-Control header HTTP/1.1 
        'Pragma': 'no-cache',//Pragma only for backwards compatibility with HTTP/1.0 clients.
        'Access-Control-Allow-Origin': '*',
    },
    mode: 'no-cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    credentials: 'same-origin'
}

export default CONSTANTS;