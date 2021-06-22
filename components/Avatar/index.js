import styles from 'styles/Components/Avatar.module.css'

export default function Avatar ({ image, username }) {
  return (
    <div className={styles.container}>
      <img alt={username} className={styles.avatar} src={image} />
      <strong>{username}</strong>
    </div>
  )
}
