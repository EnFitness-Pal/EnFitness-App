import axios from "axios";
import { baseURL } from "../../utility";

export function getAllNewsFeed(id, pageNumber, pageSize) { 
    return axios.get(`${baseURL}/api/news-feed/user?PageNumber=${pageNumber}&PageSize=${pageSize}&personId=${id}`);
}

export function createNewsFeed(id, status, image, video){
    return axios.post(`${baseURL}/api/news-feed`,{
        "Status": status,
        "Image": image,
        "Video": video,
        "PersonId": id
    });
}