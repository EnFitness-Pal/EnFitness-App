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
export function reactionNewsFeed(id, personId, string){
    return axios.put(`${baseURL}/api/news-feed/reaction`,{
        "StatusVote": string,
        "PersonId": personId,
        "NewsFeedId": id
    })
}

export function getDetailsNewsFeed(id, personId){
    return axios.get(`${baseURL}/api/news-feed/${id}?personId=${personId}`);
}

export function deletePost(id){
    return axios.delete(`${baseURL}/api/news-feed/${id}`)
}