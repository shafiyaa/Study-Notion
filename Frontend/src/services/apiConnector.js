import axios from "axios"

// create the instance
export const axiosInstance = axios.create({})

// API connector
export const apiConnector = (method, url, bodyData, headers, params)=>{
   
    return  axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
    })
    
}