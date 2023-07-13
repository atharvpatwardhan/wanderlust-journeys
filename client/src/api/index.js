import axios from 'axios';

// const url = 'http://localhost:5000/posts';

const API = axios.create({baseURL:'https://wanderlust-journeys-backend-git-main-atharvpatwardhan.vercel.app'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;

})


export const fetchPosts = () => API.get('/posts');

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newpost) => API.post('/posts',newpost);

export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery || 'none'}`) 

export const updateUser = (id,data) => API.patch(`/user/${id}`,data);

export const comment = (value,id) => API.post(`/posts/${id}/commentPost`,{value});
