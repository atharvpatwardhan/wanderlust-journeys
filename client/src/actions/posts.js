import * as api from '../api';
import { FETCH_ALL,CREATE,DELETE,UPDATE,FETCH_BY_SEARCH, FETCH_POST,COMMENT } from '../constants/actionTypes'; 

export const getPosts = () => async(dispatch) => {

    try{
        const {data} = await api.fetchPosts();
        dispatch({type:FETCH_ALL,payload:data});
    }
    catch(error){
        console.log(error)
    }

}


export const getPost = (id) => async(dispatch) => {

    try{
        const {data} = await api.fetchPost(id);
        dispatch({type:FETCH_POST,payload:{post:data}});
    }
    catch(error){
        console.log(error)
    }

}


export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        // dispatch({type:})
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery);

        dispatch({type : FETCH_BY_SEARCH,payload: data});
        console.log(data);
    } 
    catch (error) {
        console.log(error);
    }
}



export const createPost = (newpost) => async(dispatch) => {
    try{
        const {data} = await api.createPost(newpost);
        dispatch({type:CREATE, payload:data});
    }
    catch(error){
        console.log(error);
    }
}

export const updatePost = (id,post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id,post);

        dispatch({type:UPDATE,payload:data})
    } 
    catch (error) {
        console.log(error.message);
        
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type:DELETE,payload:id});
    } 
    catch (error) {
        console.log(error);
    }
}

export const commentPost = (comment,id) => async(dispatch) => {
    try {
        const { data } = await api.comment(comment,id);

        dispatch({type: COMMENT,payload:data});

        return data.comments;
    } 
    catch (error) {
        console.log(error);
    }
}


export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({type:UPDATE,payload:data})
    } 
    catch (error) {
        console.log(error);
        
    }
}