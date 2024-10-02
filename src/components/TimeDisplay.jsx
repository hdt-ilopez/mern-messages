import { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    displayTime();
  }, []);

  function displayTime() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  function successCallback(position) {
    const { latitude, longitude } = position.coords;
    const googleTimeZoneApiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${Math.floor(
      Date.now() / 1000
    )}&key=AIzaSyCQ4uXnNrW-HeOmCkHGTlaiRgOuyGg3YBs`;

    fetch(googleTimeZoneApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          const timeZone = data.timeZoneId;
          const currentTime = new Date().toLocaleString('en-US', {
            timeZone: timeZone,
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          });
          setTime(currentTime);
        } else {
          console.error('Error fetching timezone data:', data.status);
        }
      })
      .catch((error) => console.error('Error fetching timezone data:', error));
  }

  function errorCallback(error) {
    console.error('Geolocation error:', error.message);
  }

  return <p className="text-[#727697] font-bold">{time}</p>;
};

export default TimeDisplay;
