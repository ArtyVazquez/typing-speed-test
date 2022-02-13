import { useState, useRef } from "react"
import randomWords from 'random-words'
import styles from './SpeedTest.module.css'
import '../WordStructure/LinkedList.js'
import Timer from './Timer.js';

export default function SpeedTest() {

  const randWordPool = randomWords({ min: 100, max: 100 });
  const [rightText, setRightText] = useState(randWordPool.join(' '));
  const [leftText, setLeftText] = useState('');
  const [inputText, setInputText] = useState('');
  let totalMisses = 0;
  let totalCurrentWords = 0;
  let currIndex = 0;
  const inputRef = useRef();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60); // 10 minutes timer


  function onDivClickHandler() {
    inputRef.current.focus();
  }

  function inputHandler(e) {

      // check if the word inputted wad correct
      if (e.target.value == rightText.charAt(0)) {
        setLeftText(leftText + e.target.value);
        setRightText(rightText.slice(1, rightText.length));
      } else {
        setLeftText(leftText + '❌');
      }
      setInputText('');

    

  }

  function keyDownHandler(e) {
    
    // backspace
    if (e.which == 8) {
      let saveChar = leftText.charAt( leftText.length-1);

       console.log(leftText);
      if (saveChar == '❌') {
        setLeftText(leftText.slice(0, leftText.length-1));
      } else {
        setRightText(saveChar + rightText);
        setLeftText(leftText.slice(0, leftText.length-1));
      }
    }

  }

  return (
    <>
      <Timer expiryTimestamp={time}/>
      
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
