import React, { useState } from 'react'
import './SettingBox.css';

const SettingBox = ({
    studyDuration,
    breakDuration, 
    setStudyDuration, 
    setBreakDuration,
    setStudyTime,
    setBreakTime
    }) => {
    const [studyTime, setLocalStudyTime] = useState(studyDuration / 60);
    const [breakTime, setLocalBreakTime] = useState(breakDuration / 60);

    const handleSave = () => {
        const newStudy = Number(studyTime) * 60;
        const newBreak = Number(breakTime) * 60;
        setStudyDuration(newStudy);
        setBreakDuration(newBreak);
        setStudyTime(newStudy);   // <-- update timer
        setBreakTime(newBreak);   // <-- update timer
  };
    return (
    <div className="container">
        <label className="studySession">
            <text className="studyLabel">Study:</text>
            <input
                className="studyInput"
                type="number"
                value={studyTime}
                onChange={(e) => setLocalStudyTime(e.target.value)}
            />
        </label>
        <label className="breakSession">
            <text className="breakLabel">Break:</text>
            <input
                className="breakInput"
                type="number"
                value={breakTime}
                onChange={(e) => setLocalBreakTime(e.target.value)}
            />
        </label>
        <button className="saveBtn" onClick={handleSave}>Save</button>
    </div>
    )
}

export default SettingBox