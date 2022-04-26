import React, { useEffect, useState, useRef } from 'react';
import useRecorder from "./Recorder";
import sendAudio from '../../images/sendAudio.svg'
import recordAudio from '../../images/RecordAudio.svg'
import trash from '../../images/trash.svg'
import pause from '../../images/pause.svg'
import './RecorderPopUp.css'
import { Button } from 'react-bootstrap';


// recorder pop up, logic of recording buttons and bar.
function RecordPopUp({setRecord, setRecordMenu}) {
	const [showButtons, setShowButtons] = useState({showRecord: true, showPause: false, showBin: false, showSend: false});
	const [submitAudio, setSubmitAudio] = useState(false);
	let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
	
	// for every button clicked in the bar would show different available options.
	const handleClick = (e) => {
		switch(e.target.name) {
			case "RECORD":
				startRecording();
				setShowButtons({...showButtons, showRecord: false, showPause: true});
				break;
			case "PAUSE":
				setShowButtons({...showButtons, showPause: false, showBin: true, showSend: true});
				stopRecording();
				break;
			case "SEND":
				stopRecording();
				setSubmitAudio(true);
				break;
			case "TRASH":
				stopRecording();
				setShowButtons({...showButtons, showRecord: true, showBin: false, showSend: false});
				break;
      default:
        break;
		};
	}

	// if audio was submited set setRecorder useState (nested) to current audioURL.
	useEffect(() => {
		if(submitAudio) {	
		setRecord(audioURL);
		setRecordMenu(false);
    }
	}, [submitAudio, setRecord, audioURL]);
	
  return (
    <div className="popUp">
      <audio src={audioURL} controls />
	  <div className='popUp__Icons'>
		{showButtons.showRecord && <Button  size="xsm" variant="outline-light"><img width="21" height="21" src={recordAudio} alt="" name="RECORD" onClick={handleClick} disabled={isRecording} /> </Button>}
      	{showButtons.showSend &&  <Button size="xsm" variant="outline-light"><img width="21" height="21" src={sendAudio} alt="" name="SEND" onClick={handleClick} /></Button>}
		{showButtons.showBin && <Button size="xsm" variant="outline-light"><img width="21" height="21" src={trash} alt="" name="TRASH" onClick={handleClick} /></Button>}
		{showButtons.showPause && <Button size="xsm" variant="outline-light"><img width="21" height="21" src={pause} alt="" name="PAUSE" onClick={handleClick} disabled={!isRecording} /></Button>}
   	 </div>
	</div>
  );
}

export default RecordPopUp;
