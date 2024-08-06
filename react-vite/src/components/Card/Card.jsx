import styles from './Card.module.css';

const Card = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
};

export default Card;
