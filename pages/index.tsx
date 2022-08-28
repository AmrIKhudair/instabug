import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Event from '../components/Event'

const Home: NextPage = () => {
  const events = [
    {
      actor: 'a@b.c',
      action: 'user.login_succeeded',
      date: 'Aug 7, 4:48 PM'
    },
    {
      actor: 'a@b.c',
      action: 'user.login_succeeded',
      date: 'Aug 7, 4:48 PM'
    },
    {
      actor: 'a@b.c',
      action: 'user.login_succeeded',
      date: 'Aug 7, 4:48 PM'
    }
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Instalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.input_group}>
            <input className={styles.search_input} />
          </div>
          <div className={styles.thead}>
            <div className={styles.th}>ACTOR</div>
            <div className={styles.th}>ACTION</div>
            <div className={styles.th}>DATE</div>
          </div>
        </header>

        <main className={styles.main}>
          { events.map((event, i) => <Event event={event} key={i} />)}
        </main>

        <button className={styles.load_more}>
          LOAD MORE
        </button>
      </article>
        
    </div>
  )
}

export default Home
