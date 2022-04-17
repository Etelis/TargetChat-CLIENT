import React, { useEffect, useState, useRef } from 'react';
import { render } from "react-dom";
import useRecorder from "./Recorder";
import sendAudio from '../images/sendAudio.svg'
import recordAudio from '../images/RecordAudio.svg'
import trash from '../images/trash.svg'
import pause from '../images/pause.svg'

function RecordPopUp({setRecord, setRecordMenu}) {
	const [showButtons, setShowButtons] = useState({showRecord: true, showPause: false, showBin: false, showSend: false});
	const [submitAudio, setSubmitAudio] = useState(false);
	let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
	
	const handleClick = (e) => {
		switch(e.target.name) {
			case "RECORD":
        console.log("r");
				startRecording();
				setShowButtons({...showButtons, showRecord: false, showPause: true});
				break;
			case "PAUSE":
        console.log("p");
				setShowButtons({...showButtons, showPause: false, showBin: true, showSend: true});
				stopRecording();
				break;
			case "SEND":
        console.log("s");
				stopRecording();
				setSubmitAudio(true);
				break;
			case "TRASH":
        console.log("t");
				stopRecording();
				setShowButtons({...showButtons, showRecord: true, showBin: false, showSend: false});
				break;
      default:
        break;
		};
	}

	useEffect(() => {
		if(submitAudio)
		{	
		setRecord(audioURL);
		console.log(audioURL);
		setRecordMenu(false);
		}
	}, [submitAudio, setRecord, audioURL]);
	
  return (
    <div className="App">
      <audio src={audioURL} controls />
			{showButtons.showRecord && <img src={recordAudio} alt="" name="RECORD" onClick={handleClick} disabled={isRecording} />}
      {showButtons.showSend && <img src={sendAudio} alt="" name="SEND" onClick={handleClick} />}
			{showButtons.showBin && <img src={trash} alt="" name="TRASH" onClick={handleClick} />}
			{showButtons.showPause && <img src={pause} alt="" name="PAUSE" onClick={handleClick} disabled={!isRecording} />}
    </div>
  );
}

export default RecordPopUp;
