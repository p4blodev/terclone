import Avatar from 'components/Avatar'
import styles from 'styles/components/Devit.module.css'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import useTimeAgo from 'hooks/useTimeAgo'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function Devit({
  avatar,
  createdAt,
  id,
  img,
  content,
  userName,
  userId,
}) {
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }
  return (
    <article className={styles.container} key={id} onClick={handleArticleClick}>
      <Avatar image={avatar} username={userName} />
      <section>
        <header>
          <strong>{userName}</strong>
          <span> . </span>
          <span>
            <Link href={`/status/${id}`}>
              <a className={styles.link}>
                <time className={styles.dateText} title={createdAtFormated}>
                  {timeAgo}
                </time>
              </a>
            </Link>
            .
          </span>
        </header>
        <p>{content}</p>
        {img && <img className={styles.tuitImg} src={img} alt="tuit-img" />}
      </section>
    </article>
  )
}
