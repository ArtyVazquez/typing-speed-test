import { useState, useRef } from "react"
import Result from "./Result";
import styles from './SpeedTest.module.css'
import Timer from './Timer'

export default function SpeedTest(props) {

  const randWordPool = props.randWords;// get n number of random words
  
  const [rightText, setRightText] = useState(randWordPool.join(' '));
  const [leftText, setLeftText] = useState('');
  const [inputText, setInputText] = useState('');
  
  const [startTimer, setStartTimer] = useState(false);
  
  const [wpm, setWPM]  = useState(0);
  const [cpm, setCPM]  = useState(0);
  const [accuracy, setAccuracy]  = useState(0);
  const [modalState, setModalState] = useState('none');

  const inputRef = useRef();


  const time = 60;

  // when any div is clicked set focus on the input
  function onDivClickHandler() {
    inputRef.current.focus();
  }


  // when any char is inputted change the state of both divs
  function inputHandler(e) {
    
     // only call on the first input char
      setStartTimer(true);

      

      // check if the word inputted wad correct
      if (e.target.value == rightText.charAt(0)) {
        setLeftText(leftText + e.target.value);
        setRightText(rightText.slice(1, rightText.length));
      } else {
        // if space skip the word and replace each char with a X
        if (e.target.value == ' ') { 
         
          if (leftText.charAt(leftText.length-1).match(/^[a-zA-Z]/) || 
              leftText.charAt(leftText.length-1) == '❌' ) { // and previous is a letter
            const extractWord = rightText.split(' ')[0];
            setRightText(rightText.slice(extractWord.length+1)); 
            setLeftText(leftText + '❌'.repeat(extractWord.length)+' ');
          }
        } else {
          setLeftText(leftText + '❌');
        }
      }
      calculateStats();
      setInputText('');
  }

  // handler for backspace
  function keyDownHandler(e) {
    // backspace
    if (e.which == 8) {
      let saveChar = leftText.charAt(leftText.length-1);
      // allow to delete if the left first index is not a space
      if (saveChar != ' ') {
        if (saveChar == 'x') {
          setLeftText(leftText.slice(0, leftText.length-1));
        } else {
          setRightText(saveChar + rightText);
          setLeftText(leftText.slice(0, leftText.length-1));
        }
      } 
    }
  }

  function timerOutHandler() {
    calculateStats();
    inputRef.current.blur();
    setModalState('block'); // display the modal
  }
  
  function calculateStats() {
    const userResult = leftText.split(' ');
    let wpm = 0;
    for (let i = 0; i < userResult.length; ++i) {
      if (randWordPool[i] == userResult[i])
        wpm++;
    }

    const accuracyPercentage = Math.round((wpm / userResult.length) * 100);
    const cpm = leftText.length;

    setWPM(wpm);
    setAccuracy(accuracyPercentage);
    setCPM(cpm);
  }


  return (
    <>
      <Result modalState= {modalState} 
              setModalState={setModalState} 
              wpm={wpm}
              cpm={cpm}
              accuracy={accuracy}/>
      
      
      <div className={styles.currStats}>
        <Timer time={time} timerOut={timerOutHandler} startTimer={startTimer}/>
        
        {/* <div>
          <div>wpm: {wpm}</div>
          <div>cpm: {cpm}</div>
          <div>accuracy: {accuracy}</div>
        </div> */}
      </div>

      <div className={styles.box}>

        <div className={styles.wordDivLeft}
            onClick={onDivClickHandler}>
          <p>
          ‎{leftText}‎
          </p>
        </div>

        <div className={styles.inputDiv} >
          <input type='text' 
                ref={inputRef}
                maxLength={1} 
                value={inputText} 
                onChange={(e) => inputHandler(e)} 
                onKeyDown={(e) => keyDownHandler(e)}/>
        </div>
        
        <div className={styles.wordDivRight}
              onClick={onDivClickHandler}>
            <p>
              {rightText}
            </p>
        </div>

      </div>
    </>
  )
}