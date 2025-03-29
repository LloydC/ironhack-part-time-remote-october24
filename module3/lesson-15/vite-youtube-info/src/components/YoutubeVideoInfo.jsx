import { useState } from "react";
import axios from "axios";

const YouTubeVideoInfo = () => {
  const [videoId, setVideoId] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState("");

  const fetchVideoDetails = async () => {
    if (!videoId) {
      setError("Please enter a YouTube video ID");
      return;
    }
    setError("");

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
      
      const response = await axios.get(url);
      console.log('response.data',response.data);
      if (response.data.items.length > 0) {
        setVideoDetails(response.data.items[0].snippet);
      } else {
        setError("Video not found");
      }
    } catch (error) {
      setError("Failed to fetch video details");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">YouTube Video Info</h2>
      <input
        type="text"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        placeholder="Enter YouTube Video ID"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={fetchVideoDetails}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Fetch Details
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {videoDetails && (
        <div className="mt-4">
          <h3 className="font-bold">{videoDetails.title}</h3>
          <p>{videoDetails.description}</p>
          <img
            src={videoDetails.thumbnails.medium.url}
            alt="Thumbnail"
            className="mt-2 w-full rounded"
          />
        </div>
      )}
    </div>
  );
};

export default YouTubeVideoInfo;
