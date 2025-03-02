import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PodcastPlayer() {
  const {id}=useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTitle,setCurrentTitle]=useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch the initial video URL and suggestions from the API
    axios.get(`http://localhost:8080/api/podcast/${id}`)
      .then(response => {
        console.log(response.data.podcast[0].url)
        setCurrentUrl(response.data.podcast[0].url);
        setCurrentTitle(response.data.podcast[0].title);
        setSuggestions(response.data.suggestions || []);
        console.log(currentUrl);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (url, title) => {
    setCurrentUrl(url);
    setCurrentTitle(title);
  };


  const handleNext = () => {
    if (currentIndex + 4 < suggestions.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  const filteredSuggestions = suggestions
    .filter(suggestion => suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(currentIndex, currentIndex + 4);

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Podcast</h1>
      <input 
        type="text" 
        placeholder="Search podcasts..." 
        value={searchTerm} 
        onChange={handleSearch} 
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />
      <div className="flex w-full max-w-6xl">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
          <div className="relative pt-[56.25%]">
            <ReactPlayer 
              url={currentUrl} 
              controls 
              className="absolute top-0 left-0"
              width='100%' 
              height='100%' 
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">{currentTitle}</h2>
        </div>
        <div className="w-1/3 ml-4 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Suggestions</h2>
          <div className="grid grid-cols-1 gap-4">
            {filteredSuggestions.length > 0 && filteredSuggestions.map(suggestion => (
              <div key={suggestion.id} className="flex items-center cursor-pointer" onClick={() => handleSuggestionClick(suggestion.url, suggestion.title)}>
                <img src={suggestion.thumbnail} alt={suggestion.title} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <span className="text-blue-500 hover:underline">{suggestion.title}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={handlePrev} disabled={currentIndex === 0} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Previous</button>
            <button onClick={handleNext} disabled={currentIndex + 4 >= suggestions.length} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastPlayer;