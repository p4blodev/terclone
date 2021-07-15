import Avatar from 'components/Avatar'
export default function Devit({ avatar, id, message, username }) {
  return (
    <article key={id}>
      <Avatar image={avatar} username={username} />
      <div>
        <p>{message}</p>
      </div>
    </article>
  )
}
