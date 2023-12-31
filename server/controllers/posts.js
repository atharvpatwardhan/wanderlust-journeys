import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res) =>{

    res.header("Access-Control-Allow-Origin", "*");

    try{
        const postMessages = await PostMessage.find();
        // console.log(postMessages);
        res.status(200).json(postMessages);

    }
    catch(error){
        res.status(404).json({message:error.message});    
    }
}

export const getPost = async (req,res) =>{

    const {id} = req.params;

    try{
        const post = await PostMessage.findById(id);
        res.header("Access-Control-Allow-Origin", "*");

        res.status(200).json(post);
    }
    catch(error){
        res.header("Access-Control-Allow-Origin", "*");

        res.status(404).json({message:error.message});

    }
}


export const getPostsBySearch = async(req,res) => {

    const {searchQuery} = req.query
    // console.log(searchQuery);

    try {
        const title = new RegExp(searchQuery,'i');
        const posts = await PostMessage.find({title});
        // console.log(posts);
        res.header("Access-Control-Allow-Origin", "*");

        res.json({data: posts});
        
    } 
    catch (error) {
        res.header("Access-Control-Allow-Origin", "*");

        res.status(404).json({message:error})
    }
}



export const createPost = async (req,res) =>{
    const post = req.body;
    res.header("Access-Control-Allow-Origin", "*");

    const newPost = new PostMessage({ ...post,creator : req.userId, createdAt : new Date().toISOString() });

    try{
        await newPost.save();
        

        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async(req,res) => {
    const { id : _id } = req.params;
    const post = req.body;

    res.header("Access-Control-Allow-Origin", "*");


    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with given Id.');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true});
    res.json(updatedPost);
}

export const deletePost = async(req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with given Id.');

    await PostMessage.findByIdAndRemove(id);
    res.header("Access-Control-Allow-Origin", "*");

    res.json({message:'Post Deleted.'});
}

export const likePost = async(req,res) => {
    const { id } = req.params;
    res.header("Access-Control-Allow-Origin", "*");

    if(!req.userId) return res.json({message:'Unauthenticated User.'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with given Id.');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id)=> id === String(req.userId));

    if(index===-1){
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id)=> id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post ,{new:true})

    res.json(updatedPost);
}

export const commentPost = async(req,res) => {
    const { id } = req.params;

    const { value } = req.body;

    // console.log(value);
    res.header("Access-Control-Allow-Origin", "*");


    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});

    res.json(updatedPost);


}
