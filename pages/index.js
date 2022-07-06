import { useRouter } from 'next/router';
import * as React from 'react';
import Pisces from '../components/Pisces';
import Context from '../contexts/Context';
import styles from '../styles/Home.module.css';
// import Image from 'next/image'

export default function Home() {
  const router = useRouter();
  const { registered } = React.useContext(Context);
  const [fader, setFader] = React.useState(`${styles.fadeIn}`);
  const registerUser = () => {
    router.push('registerUser');
  };

  return (
    <div className={fader}>
      <div className={styles.container}>
        {!registered &&
          <main className={styles.main}>
            {/* <h1 className={styles.title} style={{ color: 'whitesmoke' }}>
              <em>“There are many fish in the sea, but never let a good one swim away.”</em>
            </h1> */}
            <Pisces className={styles.logo} />
            <br />
            <button className={styles.btn} onClick={() => {
              setFader(`${styles.fadeIn} ${styles.fadeOut}`);
              setTimeout(registerUser, 400);
            }}>New User</button>
            <button className={styles.btn}>New Business</button>
            {/* old code */}
            <>
              {/* <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>
            <p className={styles.description}>
              Get started by editing{' '}
              <code className={styles.code}>pages/index.js</code>
            </p>
            <div className={styles.grid}>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>Documentation &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>
              <a href="https://nextjs.org/learn" className={styles.card}>
                <h2>Learn &rarr;</h2>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>
              <a
                href="https://github.com/vercel/next.js/tree/canary/examples"
                className={styles.card}
              >
                <h2>Examples &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className={styles.card}
              >
                <h2>Deploy &rarr;</h2>
                <p>
                  Instantly deploy your Next.js site to a public URL with Vercel.
                </p>
              </a>
            </div> */}
            </>
          </main>
        }
        <footer className={styles.footer}>
          {/* old code */}
          <>
            {/* <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <span className={styles.logo}>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
              </span>
            </a> */}
          </>
        </footer>
      </div>
    </div>
  )
}
