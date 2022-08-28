import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Event from '../components/EventRow'
import useEvents from '../lib/useEvents'
import { useState } from 'react'

const Home: NextPage = () => {
  const [ q, setQ ] = useState('')
  const { pages, loading, error, hasMore, loadMore } = useEvents({ q })

  return (
    <div className={styles.container}>
      <Head>
        <title>Instalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.input_group}>
            <input className={styles.search_input} onChange={e => setQ(e.target.value)} />
          </div>
          <div className={styles.thead}>
            <div className={styles.th}>ACTOR</div>
            <div className={styles.th}>ACTION</div>
            <div className={styles.th}>DATE</div>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.event_list}>
            { pages }
          </div>
        </main>

        <button className={styles.load_more} onClick={loadMore} disabled={error || loading || !hasMore}>
          { error ? 'ERROR' : loading ? 'LOADING' : hasMore ? 'LOAD MORE' : 'THE END' }
        </button>
      </article>
        
    </div>
  )
}

export default Home
