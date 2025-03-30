import React, {useState, useEffect} from 'react';
import axios from 'axios'
import FlightVisuals from './FlightVisuals';

import './App.css';

function App() {

  // states for flights
  const [flight, setflight] = useState(null);
  const [newFlight, setNewFlight] = useState({ Altitude: '', HIS: '', ADI: '' });

  //states for handeling user input
  const [errorMessage, setErrorMessage] = useState('');

  //for button states
  const [isVisualizing, setIsVisualizing] = useState(true); // Initially, we are visualizing the data
  const [showForm, setShowForm] = useState(false); // State to toggle the form visibility


  // fetch data from backhand
  useEffect(() => {
    axios.get('http://localhost:5000/flights')
      .then(response => {
        setflight(response.data);
        console.log("Data received:", response.data);
      })
      .catch(err => console.error("Error fetching data:", err));
   
     }, []);

  // Handle the form submit
  const handleSubmit =  async (e) => {
    e.preventDefault();

    const altitude = parseInt(newFlight.Altitude);
    const his = parseInt(newFlight.HIS);
    const adi = parseInt(newFlight.ADI);

    if (
      newFlight.Altitude.trim() === '' ||
      newFlight.HIS.trim() === '' ||
      newFlight.ADI.trim() === ''
    ) {
      setErrorMessage('please fill all forms');
      return;
    }
    if (
      (altitude > 3600 || altitude < 0) ||
      (his > 360 || his < 0) ||
      (adi > 100 || adi < -100)
    ) {
      setErrorMessage('please input valid values');
      return;
    }
    try {
      // send post request to backhand
      const response = await axios.post('http://localhost:5000/flights', newFlight);
      console.log("Flight added:", response.data);
      
      setflight(response.data); // Update the list with the new flight
      
      setNewFlight({ Altitude: '', HIS: '', ADI: '' }); // Clear the form
      setErrorMessage('');
      setShowForm(false); // Close the form after submission  

    } catch (err) {
      console.error("Error saving flight data:", err);
    }
  } 
  
  const toggleVisualize = () => {
    setIsVisualizing(true);
  };

  const toggleShowData = () => {
    setIsVisualizing(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form
  };

  const handleCancel = () => {
    setShowForm(false);  //cancel the form
  };

  return (
    <div className="App">

      {/* Button to open the form */}
      <button onClick={toggleForm}>+</button>
      { showForm && (
        <div className="popup-form">
          <div className="popup-content">
             <form onSubmit={handleSubmit}>
               <table className='form-table'>
                  <tbody>
                    <tr>
                     <td><label>Altitude:</label></td>
                     <td>
                       <input
                          type="number"
                          value={newFlight.Altitude}
                          onChange={(e) => setNewFlight({ ...newFlight, Altitude: e.target.value })}
                       />
                      </td>
                      </tr>
                    </tbody>
                 <tbody>
                 <tr>
                   <td><label>HIS:</label></td>
                   <td>
                     <input
                        type="number"
                        value={newFlight.HIS}
                        onChange={(e) => setNewFlight({ ...newFlight, HIS: e.target.value })}
                      />
                   </td>
                   </tr>
                  </tbody>
                 <tbody>
                 <tr>
                   <td><label>ADI:</label></td>
                   <td>
                     <input
                       type="number"
                       value={newFlight.ADI}
                       onChange={(e) => setNewFlight({ ...newFlight, ADI: e.target.value })}
                      />
                   </td>
                   </tr>
                 </tbody>
               </table>
      
               {errorMessage && (              
                 <p style={{ color: 'red', fontWeight: 'bold' }}>
                   {errorMessage}
                 </p>
                )}
             <button type="submit">Submit</button>
             <button type="button" onClick={handleCancel} style={{ backgroundColor: "gray" }}>
              cancel
             </button>

          </form>
          </div>
        </div>
      )}
      <div className='button-container'>
      {flight && (
        <>
          <button onClick={toggleVisualize}>
            Visualize 
          </button>
          <button onClick={toggleShowData}>
            Text
          </button>
        </>
      )}
      </div>

      {isVisualizing && flight && (
        <FlightVisuals altitude={flight.Altitude} his={flight.HIS} adi={flight.ADI} />
      )}

      {!isVisualizing && flight && (
        <div>
          <h3>Values</h3>
          <table>
            <tbody><tr><td>Altitude</td><td>HSI</td><td>ADI</td></tr></tbody>
            <tbody><tr><td>{flight.Altitude}</td><td>{flight.HIS}</td><td>{flight.ADI}</td></tr></tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default App;