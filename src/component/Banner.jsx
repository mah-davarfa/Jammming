import React, { useEffect, useState, useContext } from "react";
import "../styles/Banner.css";
import "../styles/darkMode.css";
import { AppContext } from "../context/AppContext.jsx";

export default function Banner() {
  const {
    continueToSearchAfterLogin,
    setContinueToSearchAsGuest,
    continueToSearchAsGuest,
    handleLoginToSpotify,
    submitted,
    name,
   
    submitHandler,
    expairationTime,
    times,
    setTimes
  } = useContext(AppContext);

 

  useEffect(() => {
    if (!expairationTime || times <= 0) return;

      const timer = setTimeout(() => {
      const remainingtime = expairationTime - Date.now();
      
        setTimes(remainingtime > 0 ? remainingtime : 0);
      
    }, 1000);
    return () => clearTimeout(timer);
  }, [times, expairationTime]);

  //Function to convert timer
  const converterOfTime = (times) => {
    let totalSecends = parseInt(Math.floor(times / 1000));
    let totalMinutes = parseInt(Math.floor(totalSecends / 60));
    let totalHoures = parseInt(Math.floor(totalMinutes / 60));

    let second = parseInt(totalSecends % 60);
    let minute = parseInt(totalMinutes % 60);
    let hour = parseInt(totalHoures % 60);

    return `${hour} : ${minute} : ${second}`;
  };

  const handleContinueAsGuest = () => {
    setContinueToSearchAsGuest(true);
  };
  ///log in button after token expaires instead taht p tag sss
  return (
    <>
      <div className="banner">
        <div className ={'wellComeCountDown'}>
         {expairationTime ? (<p>{`re-login in: ${converterOfTime(
              times
              )}`} </p>):''}
              {times <= 1 && expairationTime ? <button onClick={() => handleLoginToSpotify()} type="submit">
              Log in to Spotify
            </button>:''}
            <h1>welcome to Jammming {submitted ? name : ""}! </h1>
            
           
        </div>    
        {submitted &&
        !continueToSearchAfterLogin &&
        !continueToSearchAsGuest ? (
          <div>
            <button type="submit" onClick={handleLoginToSpotify}>
              Log in to Spotify
            </button>
            <button type="submit" onClick={handleContinueAsGuest}>
              continue As Guest
            </button>
          </div>
        ) : (
          ""
        )}

        {!submitted && (
          <form onSubmit={submitHandler} className="search-container">
            <input
             name='name'
              
              className="bannerInput"
              
              type="text"
              placeholder="please Enter your name"
            />

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
}
