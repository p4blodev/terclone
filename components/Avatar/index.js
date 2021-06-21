import styles from "../../styles/Components/Avatar.module.css";
export default function Avatar({ image, username }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar_img} src={image} />
      <strong>{username}</strong>
    </div>
  );
}
