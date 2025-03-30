import React from "react";
import './AdiCircle.css'

const AdiCircle = ({adi}) => {

    const getColor = (val) =>{
        if (val > 0) return "blue"
        else if (val === 0) return "green"
        else return "red"
    };

    const circleColor = getColor(adi);

    return (
        <div className="AdiCircle">
            <div className="circle" style={{ backgroundColor: circleColor}}></div>
        </div>
    );
};

export default AdiCircle;