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
  const [modalState, setModalState] = useState('none');
  
  const inputRef = useRef();


  // when any div is clikced set focus on the input
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
        setLeftText(leftText + '❌');
      }
      setInputText('');
  }

  // hadnler for backspace
  function keyDownHandler(e) {
    // backspace
    if (e.which == 8) {
      let saveChar = leftText.charAt( leftText.length-1);

      if (saveChar == '❌') {
        setLeftText(leftText.slice(0, leftText.length-1));
      } else {
        setRightText(saveChar + rightText);
        setLeftText(leftText.slice(0, leftText.length-1));
      }
    }
  }

  function timerOutHandler() {
    console.log(calcualteWPM());
    setWPM(calcualteWPM());
    // redirect to result page
    // or
    // make a custom component for results
    inputRef.current.blur();
    setModalState('block'); // display the modal
  }
  
  function calcualteWPM() {
    const userResult = leftText.split(' ');
    let totalRight = 0;
    for (let i = 0; i < userResult.length; ++i) {
      if (randWordPool[i] == userResult[i])
        totalRight++;
    }
    return totalRight;
  }


  return (
    <>
      <Result modalState= {modalState} 
              setModalState={setModalState} 
              wpm={wpm}/>
      
      <div>
        <Timer time={60} timerOut={timerOutHandler} startTimer={startTimer}/>
      </div>

      <div className={styles.box}>

        <div className={styles.wordDivLeft}
            onClick={onDivClickHandler}>
          
          <p>
            {leftText}‎
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
