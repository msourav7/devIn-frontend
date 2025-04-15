import {io} from "socket.io-client"
import { BASE_URL } from "./constants"
 
export const createSocketConnection=()=>{
    if(location.hostname=="localhost"){
        return io(BASE_URL);
    }else{
        //This we are doing because when connection happens in netwrok call it automatically calls api/socket.io url as[https://devin.monster/api/socket.io]
        //the default value is : /socket.io/ everything that happens in webSocket that happen in socket.io
        return io("/",{path:"/api/socket.io"});
    }
}