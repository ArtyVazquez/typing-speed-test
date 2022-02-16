import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SpeedTest from '../components/SpeedTest'
import axios from "axios"
import randomWord  from 'random-words'

export default function Home(props) {

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Typing Speed Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <h1>TYPING SPEED TEST</h1>
          <p>Want to know how fast you can type? Proceed and take the 60 second typing speed test!</p>
          <p>On average most people can type around 40 WPM and the highest has been 216 WPM.</p>
        </div>

        <SpeedTest randWords={props.data}/>
      </main>

      <footer className={styles.footer}>
        © 2022 Arturo Vazquez
      </footer>
    </div>
  )
}

// instead of using import randomWords from 'random-words'. The random words will be fetched from http://random-word-api.herokuapp.com
export async function getServerSideProps() {
  const numWords = 5;
  const url = `https://random-word-api.herokuapp.com/word?number=${numWords}`;

  try {
    var res = await axios.get(url);
  } catch(error) {
    console.log(error);
  }

  return {
    props: {
      data: randomWord(220) // or res.data
    }
  }
}
