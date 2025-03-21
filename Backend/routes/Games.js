import express from 'express';
import Games from '../models/Games.js';
const router=express.Router();

router.get('/',async(req,res)=>{
  try{
    const games=await Games.find();
    res.json({games:games});
  }catch(error){
    res.status(500).json({message:error.message})
  }
})

export default router