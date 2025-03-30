import React from "react";
import './HisCircle.css';

const HisCircle = ({his}) => {
    return (
        <div className="HisCircle">

            <div className="upward-arrow"></div>
            <div className="circle-container" style={{ transform: `rotate(-${his}deg)` }}>
                <div className="circle  ">
                    <span className="degree degree-0">0°</span>
                    <span className="degree degree-90">90°</span>
                    <span className="degree degree-180">180°</span>
                    <span className="degree degree-270">270°</span>
                </div>
            </div>
        </div>
    );
};


export default HisCircle