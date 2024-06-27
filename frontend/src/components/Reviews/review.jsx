import React, { useState } from "react";
import "./review.css"; // Import the CSS file for styling

const StarRating = ({ max, current }) => {
  const getRating = () => {
    return (current / max) * 100;
  };

  return (
    <div className="star-rating">
      {[...Array(max)].map((_, index) => (
        <span key={index}>&star;</span>
      ))}
      <div
        className="star-rating__current"
        style={{ width: getRating() + "%" }}
      >
        {[...Array(max)].map((_, index) => (
          <span key={index}>&starf;</span>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState(4);

  const randomValue = () => {
    setValue((Math.random() * 4 + 1).toFixed(2));
  };

  return (
    <div id="app">
      <div className="card">
        <div className="card-content">
          <div className="media-content">
            <p className="title is-4">Star Rating</p>
            <p className="subtitle is-6">A simple React rating component</p>
          </div>
          <StarRating max={5} current={value} />
          <br />
          <br />
          <button className="button" onClick={randomValue}>
            Play with values ({value})
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
