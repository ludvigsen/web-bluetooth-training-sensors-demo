import React, { useState, useEffect } from 'react';
import { HeartRate, PowerMeter, SpeedAndCadence } from 'web-bluetooth-training-sensors';
import logo from './logo.svg';
import './App.css';

const setHR = async (hr, setState) => {
  setState({
    hr
  })
}
function App() {
  const [state, setState] = useState({hr: 0, power: 0, cadence: 0});
  const hrSensor = new HeartRate();
  const powerMeter = new PowerMeter();
  const cadenceSensor = new SpeedAndCadence();

  const setCadence = (cadence) => setState({cadence});
  const setHr = (hr) => setState({hr});
  const setPower = (power) => setState({power});
  
  const handleClick = (sensor, setState) => async () => {
    // NOTE: Connect MUST be called on user event e.g. onClick
    await sensor.connect();
    sensor.addListener((value) => {
      setState(value);
    })
  }

  return (
    <div style={{fontSize: '46px'}} className="App">
      <button onClick={handleClick(powerMeter, setPower)}>Connect Trainer</button>
      <button onClick={handleClick(hrSensor, setHr)}>Connect Heart Rate Sensor</button>
      <button onClick={handleClick(cadenceSensor, setCadence)}>Connect Cadence Sensor</button>
      <h1>HR:      {state.hr}</h1>
      <h1>POWER:   {state.power}</h1>
      <h1>CADENCE: {state.cadence}</h1>
    </div>
  );
}

export default App;
