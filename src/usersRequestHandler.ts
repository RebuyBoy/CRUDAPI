//TODO +10 GET api/user implemented properly
// +10 GET api/user/${userId} implemented properly
// +10 POST api/user implemented properly
// +10 PUT api/user/{userId} implemented properly
// +10 DELETE api/user/${userId} implemented properly

import User from "./entity/User.js";
import {IncomingMessage, ServerResponse} from "http";

const urlRegex = /^\/api\/users\/?(?<uuid>[a-f\d-]{36})?$/

export function handleRequest(req:IncomingMessage, res:ServerResponse) {
    const url:string = req.url;
    const method = req.method;
    console.log(method)
    if(method==="GET"){
        
    }

    const regExpMatchArray = url.match(urlRegex);
    const groups = urlRegex.exec(url);
    console.log(regExpMatchArray)
    console.log("groups",groups);
}