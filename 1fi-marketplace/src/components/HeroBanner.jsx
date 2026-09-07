import styles from "./HeroBanner.module.css";

function HeroBanner() {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <span className={styles.heroBadge}>
            NO-COST EMIs
          </span>

          <h1>
            Shop today,
            <br />
            Pay later using
            <br />
            Mutual funds.
          </h1>

          <p>
            No credit score required. No interest.
            Backed by your investments.
          </p>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroShoppingBag}>
            <span className={styles.heroBagHandle} />

            <span className={styles.heroRupee}>
              ₹
            </span>
          </div>

          <span
            className={`${styles.heroCoin} ${styles.heroCoinOne}`}
          >
            ₹
          </span>

          <span
            className={`${styles.heroCoin} ${styles.heroCoinTwo}`}
          >
            ₹
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;