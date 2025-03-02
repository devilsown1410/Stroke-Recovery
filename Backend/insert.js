import mongoose from 'mongoose';
import Podcast from './models/Podcast.js'

const podcasts = [
  {
    "title": "Stroke Rehab: The Good, The Bad, and The Ugly with Bill Monroe",
    "url": "https://www.youtube.com/watch?v=F9rhH-2KqrQ",
    "thumbnail": "https://i.ytimg.com/vi/F9rhH-2KqrQ/hqdefault.jpg",
    "keywords": ["stroke recovery", "rehabilitation", "patient experiences"]
  },
  {
    "title": "Believing in Stroke Recovery with Michael and Jennifer Erwin",
    "url": "https://www.youtube.com/watch?v=j_tb4TSwCAc",
    "thumbnail": "https://i.ytimg.com/vi/j_tb4TSwCAc/hqdefault.jpg",
    "keywords": ["stroke recovery", "caregiver support", "patient stories"]
  },
  {
    "title": "Optimizing Stroke Recovery with Cortney Jessee",
    "url": "https://www.youtube.com/watch?v=D1D6ZCR-osQ",
    "thumbnail": "https://i.ytimg.com/vi/D1D6ZCR-osQ/hqdefault.jpg",
    "keywords": ["stroke rehabilitation", "therapy techniques", "patient outcomes"]
  },
  {
    "title": "Stroke Healing Through Adaptive Yoga",
    "url": "https://www.youtube.com/watch?v=kDw3a0DnIJI",
    "thumbnail": "https://i.ytimg.com/vi/kDw3a0DnIJI/hqdefault.jpg",
    "keywords": ["stroke recovery", "adaptive yoga", "holistic therapy"]
  },
  {
    "title": "Navigating Spasticity Treatment with Dr. Milton",
    "url": "https://www.youtube.com/watch?v=jmndgkYcGjQ",
    "thumbnail": "https://i.ytimg.com/vi/jmndgkYcGjQ/hqdefault.jpg",
    "keywords": ["spasticity treatment", "stroke rehabilitation", "neurology"]
  },
  {
    "title": "Navigating Life After Stroke: The Power of Choice",
    "url": "https://www.youtube.com/watch?v=4mh35dtbRng",
    "thumbnail": "https://i.ytimg.com/vi/4mh35dtbRng/hqdefault.jpg",
    "keywords": ["stroke recovery", "life after stroke", "patient empowerment"]
  },
  {
    "title": "Recovery After Stroke: Alina Gonzales's Rehabilitation Journey",
    "url": "https://www.youtube.com/watch?v=example7",
    "thumbnail": "https://i.ytimg.com/vi/example7/hqdefault.jpg",
    "keywords": ["stroke recovery", "rehabilitation journey", "patient story"]
  },
  {
    "title": "Alcohol and Stroke Recovery: Will Schmierer's Inspiring Path",
    "url": "https://www.youtube.com/watch?v=example8",
    "thumbnail": "https://i.ytimg.com/vi/example8/hqdefault.jpg",
    "keywords": ["stroke recovery", "alcohol impact", "inspiring story"]
  }
];

export const insert = async () => {
  try {
    await Podcast.insertMany(podcasts);
    console.log('Data inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  }
};
