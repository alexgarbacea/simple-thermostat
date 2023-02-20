import React, { useState, useEffect } from 'react';
import './Style/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { ThermoAction } from './Enums/ThermoActionsEnums';
import { ThermoLimits } from './Enums/ThermoLimitsEnums';

function App() {
  const TEMP_CHANGE_TIME = 1500

  const [currentTemp, setCurrentTemp] = useState<number>(20)
  const [roomTemp, setRoomTemp] = useState<number>(18)

  const getThermoAction = (): string => {
    if(currentTemp > roomTemp) return ThermoAction.HEATING
    else if (currentTemp < roomTemp) return ThermoAction.COOLING
    else return ThermoAction.IDLE
  }

  const checkTemp = (tmp: number = currentTemp): void => {
    if (tmp > ThermoLimits.MAX) {
      setCurrentTemp(ThermoLimits.MAX)
    }
    else if (tmp < ThermoLimits.MIN) {
      setCurrentTemp(ThermoLimits.MIN)
    }
  }

  useEffect(() => {
    checkTemp()
    // timer to simulate temperature change
    const timer: false | NodeJS.Timer =
      currentTemp !== roomTemp && setInterval(() => {
        const increment: number = currentTemp > roomTemp ? 1 : -1
        setRoomTemp(roomTemp + increment)
      }, TEMP_CHANGE_TIME);
    
    if (typeof timer !== 'boolean') return () => clearInterval(timer)
  }, [roomTemp, currentTemp])
  

  return (
    <div className="App">
      <section className='thermostat'>
        <div className='inner-circle'>
          <div className='left-info'>
            <div className='progress-temp'>
              <div style={{height:`${(roomTemp * 100) / ThermoLimits.MAX}%`}}></div>
            </div>
          </div>
          <div className='display'>
            <p>Room: <span className='temp'>{roomTemp}</span></p>
            <p className='big-temp'>{currentTemp}</p>
            <p>{getThermoAction()}</p>
          </div>
          <div className='arrows'>
            <FontAwesomeIcon icon={faChevronUp} onClick={() => setCurrentTemp(currentTemp + 1)} />
            <FontAwesomeIcon icon={faChevronDown} onClick={() => setCurrentTemp(currentTemp - 1)} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
