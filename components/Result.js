import { useState } from 'react'
import styles from './Result.module.css'
import Router, { useRouter } from 'next/router';

export default function Result(props) {
    const router = useRouter();

  return (

    <>
        <div  className={styles.modal} style={{display: props.modalState}}>

            {/* <!-- Modal content --> */}
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => {props.setModalState('none'); router.reload('/');}}>&times;</span>
                <h1>Typing Test Complete!</h1>
                <h2>You typed the 1 Minute Typing Test.</h2>
                <h3>Your speed was {props.wpm} WPM with accuracy {props.accuracy}%</h3>
            </div>
        </div>
    </>


  )
}