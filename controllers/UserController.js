const bcrypt = require('bcryptjs');
const usermodel=require('../models/usermodels');

//signup user
const signup=async (req,res) =>{
  const {name,email,password}=req.body;
  try{
    const hashedpassword=await bcrypt.hash(password,10);
    const newuser=await usermodel.createUser(name,email,hashedpassword);
    res.status(201).json(newuser);
  } catch(err){
    res.status(500).json({error:err.message});
  }
};
//get all users
const allusers=async (req,res) =>{
    try{
        const users=await usermodel.getAllUsers();
        res.status(200).json(users);
    } catch(err){
        res.status(500).json({message:'Error fetching user',error:err});
    }
};
//get user by id
const userbyid=async (req,res) =>{
    const {id}=req.params;
    try{
        const user=await usermodel.getUserById(id);
        if(!user)
            return res.status(404).json({error:'User not found'});
        res.status(200).json(user);
    } catch(err){
        res.status(500).json({message:'Error updating users',error:err});
    }
};

//update user
const updateuser=async (req,res) =>{
    const {id}=req.params;
    const {name,email,password}=req.body;
    try{
        const updateduser=await usermodel.updateUser(id,name,email,password);
        if(!updateduser)
            return res.status(404).json({error:'User not found'});
        res.status(200).json(updateduser);
    } catch(err){
        res.status(500).json({message:'Error updating user',error:err});
    }
};

//delete user
const deleteuser=async (req,res) =>{
    const {id}=req.params;
    try{
        const user=await usermodel.deleteUser(id);
        if(!user)
            return res.status(404).json({error:'User not found'});
        res.status(200).json({message:'User deleted successfully'});
    } catch(err){
        res.status(500).json({error:err.message});
    }
};

module.exports={signup,allusers,userbyid,updateuser,deleteuser};


