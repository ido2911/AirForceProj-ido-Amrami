import React from "react";
import './AltitudeBar.css'

const AltitudeBar = ({ altitude }) => {
    const maxAltitude = 3000;
    // get reletive bar height
    const barHeight = (altitude / maxAltitude) * 100;

    const arrowPosition = Math.min(barHeight, 100); // Cap at 100% height for the arrow
  
    return (
      <div className="AltitudeBar">
            
        <div className="bar">
            <div className="value" style={{ top: '0%' }}>3000</div>
            <div className="value" style={{ top: '33.33%' }}>2000</div>
            <div className="value" style={{ top: '66.66%' }}>1000</div>
            <div className="value" style={{ top: '92%' }}>0 </div>
        </div>

        <div
          className="arrow"
          style={{
            top: `${100 - arrowPosition}%`, // Arrow's position based on height
          }}
        >
          &#8594; {/* Arrow symbol */}
        </div>
      
      
      
      </div>
      
    );
  };
  
  export default AltitudeBar;