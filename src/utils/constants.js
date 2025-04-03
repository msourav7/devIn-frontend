// export const BASE_URL="http://localhost:7777" //earlier it was ;ile this to run for local enviroment

export const BASE_URL=location.hostname=="localhost"?"http://localhost:7777":"/api";

// export const BASE_URL="/api"; // use this for production