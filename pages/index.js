import Button from 'components/Buton'
import { loginWithGitHub } from 'firebase/client'
import Github from 'icons/Github'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Spinner from 'components/Spinner'
import useUser, { USER_STATE } from 'hooks/useUser'
import styles from 'styles/Index.module.css'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Terclone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Terclone</h1>
        <h2 className={styles.subtitle}>
          Talk about development with developers
        </h2>
        <div className={styles.action}>
          {user === USER_STATE.NOT_LOOGED && (
            <Button onClick={handleClick}>
              <Github fill="#fff" height="24" width="24" />
              Login with Gtihub
            </Button>
          )}
          {user === USER_STATE.NOT_KNOW && <Spinner />}
        </div>
      </main>
    </div>
  )
}
