import { useState } from 'react'
import styles from './Result.module.css'
import Router, { useRouter } from 'next/router';

export default function Result(props) {
    const router = useRouter();

  return (

    <>
        <div className={styles.modal} style={{display: props.modalState}}>

            {/* <!-- Modal content --> */}
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => {props.setModalState('none'); router.reload('/');}}>&times;</span>
                <h1>Typing Test Complete!</h1>
                
                <h2>{props.wpm} WPM</h2>
                <h2>{props.cpm} CPM</h2>
                <h2>{props.accuracy}% ACCURACY</h2>

                <button onClick={() => router.reload('/')}>TRY AGAIN</button>
            </div>
        </div>
    </>


  )
}