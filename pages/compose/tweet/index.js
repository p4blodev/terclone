import Button from 'components/Buton'
import useUser from 'hooks/useUser'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { addDevit, uploadImage } from 'firebase/client'
import { useRouter } from 'next/router'
import Cross from 'icons/Cross'
import Avatar from 'components/Avatar'
import styles from 'styles/pages/compose/Tweet.module.css'

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const router = useRouter()
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, SetImgURL] = useState(null)

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplote = () => {
        console.log('onComnplete')
        task.snapshot.ref.getDownloadURL().then((imgURL) => SetImgURL(imgURL))
      }
      task.on('state_changed', onProgress, onError, onComplote)
    }
  }, [task])

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
      img: imgURL,
    })
      .then(() => {
        router.push('/home')
      })
      .catch((error) => {
        console.error(error)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)

    const file = event.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const removeIMG = () => {
    SetImgURL(null)
  }

  const isButtonDisable = !message.length || status === COMPOSE_STATES.LOADING

  const taxtAreaStyle = {
    border:
      drag === DRAG_IMAGE_STATES.DRAG_OVER
        ? '3px dashed #09F'
        : '3px solid transparent',
  }

  return (
    <>
      <Head>
        <title>Create tuit</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          {user && <Avatar image={user.avatar} username={''} />}
          <form className={styles.mainForm} onSubmit={handleSubmit}>
            <textarea
              onChange={hanldeChange}
              className={styles.text}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              placeholder="What's happend"
              style={taxtAreaStyle}
              value={message}
            />
            {imgURL && (
              <div className={styles.mediaContainer}>
                <button className={styles.btnRemoveImg} onClick={removeIMG}>
                  <Cross />
                </button>
                <img className={styles.tuitImg} src={imgURL} alt="tuit-img" />
              </div>
            )}
            <div className={styles.buttonContainer}>
              <Button disabled={isButtonDisable}>Tuitear</Button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
