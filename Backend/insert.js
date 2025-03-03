import mongoose from 'mongoose';
import Podcast from './models/Podcast.js'
import Games from './models/Games.js'

// const podcasts = [
//   {
//     "title": "Stroke Rehab: The Good, The Bad, and The Ugly with Bill Monroe",
//     "url": "https://www.youtube.com/watch?v=F9rhH-2KqrQ",
//     "thumbnail": "https://i.ytimg.com/vi/F9rhH-2KqrQ/hqdefault.jpg",
//     "keywords": ["stroke recovery", "rehabilitation", "patient experiences"]
//   },
//   {
//     "title": "Believing in Stroke Recovery with Michael and Jennifer Erwin",
//     "url": "https://www.youtube.com/watch?v=j_tb4TSwCAc",
//     "thumbnail": "https://i.ytimg.com/vi/j_tb4TSwCAc/hqdefault.jpg",
//     "keywords": ["stroke recovery", "caregiver support", "patient stories"]
//   },
//   {
//     "title": "Optimizing Stroke Recovery with Cortney Jessee",
//     "url": "https://www.youtube.com/watch?v=D1D6ZCR-osQ",
//     "thumbnail": "https://i.ytimg.com/vi/D1D6ZCR-osQ/hqdefault.jpg",
//     "keywords": ["stroke rehabilitation", "therapy techniques", "patient outcomes"]
//   },
//   {
//     "title": "Stroke Healing Through Adaptive Yoga",
//     "url": "https://www.youtube.com/watch?v=kDw3a0DnIJI",
//     "thumbnail": "https://i.ytimg.com/vi/kDw3a0DnIJI/hqdefault.jpg",
//     "keywords": ["stroke recovery", "adaptive yoga", "holistic therapy"]
//   },
//   {
//     "title": "Navigating Spasticity Treatment with Dr. Milton",
//     "url": "https://www.youtube.com/watch?v=jmndgkYcGjQ",
//     "thumbnail": "https://i.ytimg.com/vi/jmndgkYcGjQ/hqdefault.jpg",
//     "keywords": ["spasticity treatment", "stroke rehabilitation", "neurology"]
//   },
//   {
//     "title": "Navigating Life After Stroke: The Power of Choice",
//     "url": "https://www.youtube.com/watch?v=4mh35dtbRng",
//     "thumbnail": "https://i.ytimg.com/vi/4mh35dtbRng/hqdefault.jpg",
//     "keywords": ["stroke recovery", "life after stroke", "patient empowerment"]
//   },
//   {
//     "title": "Recovery After Stroke: Alina Gonzales's Rehabilitation Journey",
//     "url": "https://www.youtube.com/watch?v=example7",
//     "thumbnail": "https://i.ytimg.com/vi/example7/hqdefault.jpg",
//     "keywords": ["stroke recovery", "rehabilitation journey", "patient story"]
//   },
//   {
//     "title": "Alcohol and Stroke Recovery: Will Schmierer's Inspiring Path",
//     "url": "https://www.youtube.com/watch?v=example8",
//     "thumbnail": "https://i.ytimg.com/vi/example8/hqdefault.jpg",
//     "keywords": ["stroke recovery", "alcohol impact", "inspiring story"]
//   }
// ];
const games = [
  { 
    name: "OWL Game", 
    info: "A fun and engaging puzzle game featuring an owl!", 
    difficulty: 3, 
    src: "https://html5.gamedistribution.com/f44a159d660b4b9289f9add40a3cd7c0/", 
    thumbnail: "https://media.istockphoto.com/id/183367458/photo/three-numbered-building-blocks-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=zoAJjsasSqjv8_KKvgD3tbbn0L1J53c9t5OsTlci5ag=" 
  },
  { 
    name: "Block Up", 
    info: "Stack the blocks carefully to reach the highest level.", 
    difficulty: 4, 
    src: "https://html5.gamedistribution.com/3b61e6b5bc68478092d4217139ccaf03/", 
    thumbnail: "https://media.istockphoto.com/id/183367458/photo/three-numbered-building-blocks-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=zoAJjsasSqjv8_KKvgD3tbbn0L1J53c9t5OsTlci5ag=" 
  },
  { 
    name: "Funny Walk Fil Run", 
    info: "A hilarious running game with fun obstacles!", 
    difficulty: 2, 
    src: "https://html5.gamedistribution.com/3232d8d696ec4bc1989cd0b4a0ec1482/", 
    thumbnail: "https://media.istockphoto.com/id/183367458/photo/three-numbered-building-blocks-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=zoAJjsasSqjv8_KKvgD3tbbn0L1J53c9t5OsTlci5ag=" 
  },
  { 
    name: "Traffic Tap Puzzle", 
    info: "Solve traffic puzzles by tapping the right spots.", 
    difficulty: 5, 
    src: "https://html5.gamedistribution.com/7837dbfeadba4ea784444131650fb8f6/", 
    thumbnail: "https://media.istockphoto.com/id/183367458/photo/three-numbered-building-blocks-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=zoAJjsasSqjv8_KKvgD3tbbn0L1J53c9t5OsTlci5ag=" 
  },
  {
    name: "RiddleMath", 
    info: "Solve math riddles to improve your problem-solving skills.", 
    difficulty: 4, 
    src: "https://html5.gamedistribution.com/a74a2b0e637149389b9a805f2dd21feb/?gd_sdk_referrer_url=https://www.example.com/games/{game-path}", 
    thumbnail: "https://media.istockphoto.com/id/183367458/photo/three-numbered-building-blocks-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=zoAJjsasSqjv8_KKvgD3tbbn0L1J53c9t5OsTlci5ag=" 
  },
  {
    name: "Solitaire Classic", 
    info: "A classic and relaxing card game to pass the time.", 
    difficulty: 2, 
    src: "https://html5.gamedistribution.com/77cce9cb419f4f06814d668821199476/?gd_sdk_referrer_url=https://www.example.com/games/{game-path}", 
    thumbnail: "https://media.istockphoto.com/id/183367458/photo/three-numbered-building-blocks-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=zoAJjsasSqjv8_KKvgD3tbbn0L1J53c9t5OsTlci5ag=" 
  },
  {
    name: "Fill One Line", 
    info: "Complete the line by placing the right pieces.", 
    difficulty: 3, 
    src: "https://html5.gamedistribution.com/9e8efe494f36414ca2c9a4b53811960f/?gd_sdk_referrer_url=https://www.example.com/games/{game-path}", 
    thumbnail: "https://media.istockphoto.com/id/183367458/photo/three-numbered-building-blocks-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=zoAJjsasSqjv8_KKvgD3tbbn0L1J53c9t5OsTlci5ag=" 
  },
  {
    name: "Astrobot Dash", 
    info: "Help Astrobot navigate through space obstacles.", 
    difficulty: 5, 
    src: "https://html5.gamedistribution.com/202557c3e71e430d8c81881208900488/?gd_sdk_referrer_url=https://www.example.com/games/{game-path}", 
    thumbnail: "https://media.istockphoto.com/id/183367458/photo/three-numbered-building-blocks-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=zoAJjsasSqjv8_KKvgD3tbbn0L1J53c9t5OsTlci5ag=" 
  }
];

export const insert = async () => {
  try {
    await Games.insertMany(games);
    console.log('Data inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  }
};
