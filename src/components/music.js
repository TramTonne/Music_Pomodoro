import React, { useState, useEffect } from 'react';
import './Music.css';

const Music = () => {
  const [search, setSearch] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playingUrl, setPlayingUrl] = useState(null);
  const [embedHtml, setEmbedHtml] = useState('');

  // Fetch tracks from your API when the component mounts
  useEffect(() => {
    fetch('https://your-api-url.com/tracks') // Replace with your API endpoint
      .then(res => res.json())
      .then(data => setTracks(data))
      .catch(err => console.error(err));
  }, []);

  const filteredTracks = tracks.filter(
    t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.author.toLowerCase().includes(search.toLowerCase())
  );

  const handlePlay = async (track) => {
    const res = await fetch(
      `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(track.url)}`
    );
    const data = await res.json();
    setEmbedHtml(data.html);
    setPlayingUrl(track.url);
  };

  const handleStop = () => {
    setEmbedHtml('');
    setPlayingUrl(null);
  };

  return (
    <div className="musicBox">
      <input
        type="text"
        placeholder="Search music..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="musicSearch"
      />
      <div className="trackList">
        {filteredTracks.map((track, idx) => (
          <div className="trackItem" key={idx}>
            <img src={track.thumbnail} alt={track.title} className="trackThumb" />
            <div className="trackInfo">
              <div className="trackTitle">{track.title}</div>
              <div className="trackAuthor">{track.author}</div>
            </div>
            {playingUrl === track.url ? (
              <button className="trackBtn" onClick={handleStop}>Stop</button>
            ) : (
              <button className="trackBtn" onClick={() => handlePlay(track)}>Play</button>
            )}
          </div>
        ))}
      </div>
      {embedHtml && (
        <div className="musicEmbed" dangerouslySetInnerHTML={{ __html: embedHtml }} />
      )}
    </div>
  );
};

export default Music;