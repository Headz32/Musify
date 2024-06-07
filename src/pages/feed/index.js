import React from "react";
import "./feed.css";

function Feed() {
  return (
    <div className="screen-container library-body">
      <div className="csac-card">
        <a href="https://www.csac.ro" target="_blank" rel="noopener noreferrer">
          <img
            className="csac-image"
            src="https://via.placeholder.com/150"
            alt="CSAC"
          />
          <div className="csac-fade">
            <p className="website-subtitle">Visit Website</p>
          </div>
        </a>
      </div>
      <div className="scanstart-card">
        <a
          href="https://scanstart.ro/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="scanstart-image"
            src="https://via.placeholder.com/150"
            alt="Scanstart"
          />
          <div className="scanstart-fade">
            <p className="website-subtitle">Visit Website</p>
          </div>
        </a>
      </div>
      <div className="graffino-card">
        <a
          href="https://graffino.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="graffino-image"
            src="https://via.placeholder.com/150"
            alt="Graffino"
          />
          <div className="graffino-fade">
            <p className="website-subtitle">Visit Website</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Feed;
