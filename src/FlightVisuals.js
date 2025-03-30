import React, {useEffect, useState} from 'react'
import AltitudeBar from './AltitudeBar'
import AdiCircle from './AdiCircle'
import HisCircle from './HisCircle'
import './FlightVisuals.css'


const FlightVisuals = ({altitude, his, adi}) => {
  return (
    <div className='FlightVisuals'>
        <div className='AltitudeBar'><AltitudeBar altitude={altitude}/></div>
        <div className='HisCircle'> <HisCircle his={his}/></div>
        <div className='AdiCircle'><AdiCircle adi={adi}/></div>
    </div>
  );
};

export default FlightVisuals;
