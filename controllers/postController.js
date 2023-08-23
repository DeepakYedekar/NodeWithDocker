const Post=require('../models/postSchema');

exports.getAllPost=async (req,res)=>{
    try{
        const posts=await Post.find();
        res.status(200).json({
            status:'success',
            results:posts.length,
            data:posts
        })
    }catch(e){
        res.status(400).json({
            status:'fail'
        })
    }
}

exports.getOnePost=async (req,res)=>{
    try{
        const posts=await Post.findById(req.params.id);

        res.status(200).json({
            status:'success',
            data:posts
        })
    }catch(e){
        res.status(400).json({
            status:'fail'
        })
    }
}

exports.createPost=async (req,res)=>{
    try{
        const posts=await Post.create(req.body);

        res.status(200).json({
            status:'success',
            data:posts
        })
    }catch(e){
        res.status(400).json({
            status:'fail',
            message:e.message
        })
    }
}

exports.updatePost=async (req,res)=>{
    try{
        const posts=await Post.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        res.status(200).json({
            status:'success',
            data:posts
        })
    }catch(e){
        res.status(400).json({
            status:'fail'
        })
    }
}

exports.deletePost=async (req,res)=>{
    try{
        const posts=await Post.findOneAndDelete(req.params.id);

        res.status(200).json({
            status:'success'
        })
    }catch(e){
        res.status(400).json({
            status:'fail'
        })
    }
}