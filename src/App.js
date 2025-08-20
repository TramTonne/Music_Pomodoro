import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { RotateCcw, Settings } from 'lucide-react';
import SettingBox from './components/SettingBox';
import Music from './components/music';
import Background from './components/background';

function App() {
  const[studyTime, setStudyTime] = useState(1500);
  const[breakTime, setBreakTime] = useState(300);
  const[studyDuration, setStudyDuration] = useState(1500);
  const[breakDuration, setBreakDuration] = useState(300);
  const[isActive, setIsActive] = useState(false);
  const[breakActive, setBreakActive] = useState(false);
  const[isBreak, setIsBreak] = useState(false);
  const[showSettings, setShowSettings] = useState(false);
  const[showMusic, setShowMusic] = useState(false);
  const[showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && studyTime > 0) {
      interval = setInterval(() => {
        setStudyTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (studyTime === 0) {
        setIsBreak(true);
        setBreakActive(true);
        setStudyTime(studyDuration);
    }
  }, [isActive, studyTime]);

  useEffect(() => {
    let interval = null;
    if (breakActive && breakTime > 0) {
      interval = setInterval(() => {
        setBreakTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breakActive, breakTime]);

  const handleStart = () => {
    if (isBreak) {
      setBreakActive(!breakActive);
    } else {
      setIsActive(!isActive);
    }
  }

  const handleReset = () => {
    setStudyTime(studyDuration);
    setIsActive(false);
    setIsBreak(false);
  }

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  const handleSettings = () => {
    setShowSettings(!showSettings);
  }

  const handleMusic = () => {
    setShowMusic(!showMusic);
  }

  const handleBackground = () => {
    setShowBackground(!showBackground);
  }

  return (
    <div className="App">
      <h1 className="title">Pomodoro</h1>
      <div className="btns">
        <button className="musicBtn" onClick={handleMusic}>Music</button>
        <button className="musicBtn" onClick={handleBackground}>Background</button>
      </div>
      <div className="popupMusicContainer">
      {showMusic && <Music />}
      </div>
      <div className="popupBackgroundContainer">
      {showBackground && <Background />}
      </div>
      <div className="timer">
        {isBreak ? (
          <text className="breakText">{formatTime(breakTime)}</text>
        ) : (
          <text className="timerText">{formatTime(studyTime)}</text>
        )}
      </div>
      <div className="controls">
        <button className="startBtn" onClick={handleStart}>{isActive ? "Stop" : "Start"}</button>
        <button className="resetBtn" onClick={handleReset}>
          <RotateCcw />
        </button>
        <button className="settingsBtn" onClick={handleSettings}>
          <Settings />
        </button>
      </div>
      {showSettings && (<SettingBox  
      studyDuration={studyDuration} 
      breakDuration={breakDuration} 
      setStudyDuration={setStudyDuration} 
      setBreakDuration={setBreakDuration}
      setStudyTime={setStudyTime}
      setBreakTime={setBreakTime}
      />
      )}
    </div>
  );
}

export default App;
