const User=require('../models/userSchema');
const bcrypt=require('bcryptjs');
exports.signUp=async (req,res)=>{
    try{
        let {username,password}=req.body;
        let hashpassword=await bcrypt.hashSync(password,13);
        let newUser=await User.create({
            username,
            password:hashpassword
        });
        req.session.user=newUser;
        return res.status(200).json({
            status:'success',
            data:newUser
        })
    }catch(error){
        return res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

exports.login=async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(200).json({
                status:'fail',
                message:"User not found"
            })
        }
        const compare=await bcrypt.compareSync(password,user.password);
        if(compare){
            req.session.user=user;
            return res.status(200).json({
                message:"success"
            })
        }else{
            return res.status(200).json({
                status:"fail",
                message:"Incorrect Password"
            })
        }
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}