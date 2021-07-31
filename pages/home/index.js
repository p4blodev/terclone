import Devit from 'components/Devit'
import Layout from 'components/Layout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useUser from 'hooks/useUser'
import { fetchLatestDevits } from 'firebase/client'
import Link from 'next/link'
import Create from 'icons/Create'
import IconHome from 'icons/Home'
import Search from 'icons/Search'

import styles from 'styles/pages/Home.module.css'
export default function Home() {
  useUser()
  const user = useUser()
  const [timeLine, setTimeline] = useState([])

  useEffect(() => {
    fetchLatestDevits().then((doc) => {
      setTimeline(doc)
    })
  }, [user])

  const renderDevits = () => {
    return timeLine.map((current) => {
      return (
        <Devit
          avatar={current.avatar}
          content={current.content}
          createdAt={current.createdAt}
          id={current.id}
          img={current.img}
          key={current.id}
          userId={current.userId}
          userName={current.userName}
        />
      )
    })
  }

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <header className={styles.header}>
        <p className={styles.headerTitle}>Home</p>
      </header>
      <section className={styles.content}>{renderDevits()}</section>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.navButton}>
            <IconHome stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a className={styles.navButton}>
            <Search stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a className={styles.navButton}>
            <Create stroke="#09f" />
          </a>
        </Link>
      </nav>
    </Layout>
  )
}
