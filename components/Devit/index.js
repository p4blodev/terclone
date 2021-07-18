import Avatar from 'components/Avatar'
import styles from 'styles/components/Devit.module.css'
export default function Devit({
  avatar,
  createdAt,
  id,
  content,
  userName,
  userId,
}) {
  return (
    <article key={id}>
      <Avatar image={avatar} username={userName} />
      <div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span className={styles.dateText}>
              . <time dateTime={createdAt}>{createdAt}</time>.
            </span>
          </header>
          <p>{content}</p>
        </section>
      </div>
    </article>
  )
}
