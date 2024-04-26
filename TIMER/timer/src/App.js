import React, { useState, useEffect } from 'react';
require('dotenv').config()

const App = () => {
  const [displayText, setDisplayText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      const currentSecond = currentDate.getSeconds();
      const istOffset = 5.5 * 60; // Offset for IST timezone (+5 hours 30 minutes)
      const currentTimeInSeconds = (currentHour * 3600) + (currentMinute * 60) + currentSecond + istOffset;
      
      let nextChangeInSeconds;

      if (
        (currentDay >= 1 && currentDay <= 5 && currentHour >= 18) && // Monday to Friday after 6pm
        (currentHour < 23 || (currentHour === 23 && currentMinute === 59)) // up to 11:59 pm
      ) {
        nextChangeInSeconds = ((currentDay === 5 && currentHour === 23 && currentMinute === 59) ? (6 * 3600) : (24 * 3600)) - currentTimeInSeconds;
        setDisplayText('Your text here');
      } else if (
        ((currentDay === 6 || currentDay === 0) && currentHour >= 9) && // Saturday and Sunday after 9am
        (currentHour < 24 || (currentHour === 0 && currentMinute === 0)) // up to 1 am
      ) {
        nextChangeInSeconds = ((currentDay === 0 && currentHour === 0 && currentMinute === 0) ? (7 * 3600) : (24 * 3600)) - currentTimeInSeconds;
        setDisplayText('Your text here');
      } else {
        const nextStartTime = (currentDay >= 1 && currentDay <= 5) ? 18 : 9; // Monday to Friday: 6pm, Saturday and Sunday: 9am
        nextChangeInSeconds = ((nextStartTime * 3600) - currentTimeInSeconds) + (currentDay === 0 ? (6 * 3600) : 0); // Add Sunday midnight offset
       
      }

      const hoursRemaining = Math.floor(nextChangeInSeconds / 3600);
      const minutesRemaining = Math.floor((nextChangeInSeconds % 3600) / 60);
      const secondsRemaining = nextChangeInSeconds % 60;
      setTimeRemaining(`${hoursRemaining} hours, ${minutesRemaining} minutes, and ${secondsRemaining} seconds until next change`);
    };
    calculateTimeRemaining();

    // Update the time remaining every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []);
  let currentTime = new Date().getHours();
  let Day=new Date().getDay();
  let Minutes = new Date().getMinutes();
  let Seconds = new Date().getSeconds();
  currentTime = currentTime.toLocaleString()
  let displaytext;
  display=process.env.TEXT;
  return (
    <div>
    <div>
    <span><h1>{currentTime}</h1>:</span>
    <span> <h1>{ Minutes }</h1>:</span> 
    <span><h1>{ Seconds}</h1></span> 
    </div>
   
   
   
      <h1>Display Text:</h1>
      <p>{((currentTime>=18) && (Day>=1 && Day<=5) )|| ((currentTime>=9 && currentTime <=1) && (Day===0 || Day===6)) ? displaytext :"TEXT WILL BE SHOWN AFTER THE SPECIFIC TIME WAIT TILL THEN CODE BOY!"}</p>
      <p>{timeRemaining}</p>
    </div>
  );
};

export default App;
