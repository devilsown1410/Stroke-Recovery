import Podcast from '../models/Podcast.js'; 

export const getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

export const getPodcastById = async (req, res) => {
  try {
    const id = req.params.id; 
    const podcast = await Podcast.findById(id); 
    
    const podcasts = await Podcast.find(); 
    const suggestions = podcasts.map(pod => ({
      id: pod._id,
      title: pod.title,
      url: pod.url,
      thumbnail: pod.thumbnail
    }));

    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    res.status(200).json({ podcast, suggestions });
  } catch (error) {
    console.error('Error getting podcast:', error);
    res.status(500).json({ message: 'Error getting podcast', error });
  }
};
