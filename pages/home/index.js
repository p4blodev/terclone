import Devit from 'components/Devit'
import Layout from 'components/Layout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from 'styles/pages/Home.module.css'
export default function Home() {
  const [timeLine, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <p className={styles.headerTitle}>Home</p>
      </header>
      <section className={styles.content}>
        {timeLine.map((current) => {
          return (
            <Devit
              key={current.id}
              avatar={current.avatar}
              id={current.id}
              message={current.message}
              username={current.username}
            />
          )
        })}
      </section>
      <nav className={styles.nav}>
        <p>Navigation</p>
      </nav>
    </Layout>
  )
}
