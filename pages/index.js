import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import SpeedTest from '../components/SpeedTest'
import axios from "axios"
import randomWord  from 'random-words'

export default function Home(props) {

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Typing Speed Test</title>
        <meta name="60 second typing speed test." content="Check how fast you can type." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <h1>TYPING SPEED TEST</h1>
        </div>

        <SpeedTest randWords={props.data}/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://arturo-vazquez-site.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by {' '}
        <span className={styles.logo}>
          <Image src="/arty.png" alt="Arty Logo" width={36} height={36} />
        </span>
        </a>
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
