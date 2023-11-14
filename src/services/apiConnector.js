import axios from "axios"

// create the instance
export const axiosInstance = axios.create({})

// API connector
export const apiConnector = (method, url, bodyData, headers, params)=>{
       console.log("Api Connector");

    return  axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
    })
    
}