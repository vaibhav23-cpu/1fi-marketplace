import styles from "./BrandCard.module.css";

function BrandCard({
  logo,
  name,
  description,
}) {
  return (
    <div className={styles.brandCard}>
      <div className={styles.brandLogo}>
        {logo}
      </div>

      <div className={styles.brandInfo}>
        <h3>{name}</h3>

        <p>{description}</p>
      </div>

      <div className={styles.brandArrow}>
        ›
      </div>
    </div>
  );
}

export default BrandCard;