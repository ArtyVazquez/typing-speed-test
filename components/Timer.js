import { useState } from 'react'
import styles from './Timer.module.css'

export default function Timer(props) {
  const [secCounter, setSecCounter] = useState(props.time);

  // make a circular timer
  let timer = setTimeout (() => {
    if (props.startTimer) {
      if (secCounter > 0)
        setSecCounter(secCounter - 1);
      else
        props.timerOut();
    }
  }, 1000);

  return (
    <div className={styles.roundDiv}>
       <h1> {secCounter} </h1>
    </div>
  )
}
