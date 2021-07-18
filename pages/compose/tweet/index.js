import styles from 'styles/pages/compose/Tweet.module.css'
import Button from 'components/Buton'
import useUser from 'hooks/useUser'
import { useState } from 'react'
import { addDevit } from 'firebase/client'
import { useRouter } from 'next/router'

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const router = useRouter()

  const hanldeChange = (event) => {
    const { value } = event.target

    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push('/home')
      })
      .catch((error) => {
        console.error(error)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisable = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={hanldeChange}
            className={styles.text}
            placeholder="What's happend"
            value={message}
          ></textarea>
          <div>
            <Button disabled={isButtonDisable}>Devitear</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
