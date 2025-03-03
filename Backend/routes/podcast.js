import express from 'express';
import Podcast from '../models/Podcast.js'; // Assuming you have a Podcast model

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    console.log(podcasts);
    
    res.json({podcasts});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const podcast=await Podcast.find({_id:id});
        const podcasts=await Podcast.find({});
        const suggestions = podcasts.map(podcast => ({
        id: podcast._id,
        title: podcast.title,
        url: podcast.url,
        thumbnail: podcast.thumbnail
        }));
            res.json({ podcast, suggestions });
        }
    catch(error){
        res.json("Error getting podcast",error);
    }
})

export default router;