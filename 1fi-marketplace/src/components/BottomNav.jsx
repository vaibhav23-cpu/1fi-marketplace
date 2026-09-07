import {
  Home,
  ShoppingBag,
  IndianRupee,
  CircleGauge,
  UserRound,
} from "lucide-react";

import styles from "./BottomNav.module.css";

function BottomNav() {
  return (
    <nav className={styles.bottomNav}>
      <button
        type="button"
        className={styles.navItem}
      >
        <span className={styles.navIcon}>
          <Home
            size={20}
            strokeWidth={1.7}
          />
        </span>

        <span>Home</span>
      </button>

      <button
        type="button"
        className={`${styles.navItem} ${styles.activeNav}`}
      >
        <span className={styles.navIcon}>
          <ShoppingBag
            size={20}
            strokeWidth={2}
          />
        </span>

        <span>Shop</span>
      </button>

      <button
        type="button"
        className={styles.navItem}
      >
        <span className={styles.navIcon}>
          <IndianRupee
            size={20}
            strokeWidth={1.8}
          />
        </span>

        <span>EMI Dues</span>
      </button>

      <button
        type="button"
        className={styles.navItem}
      >
        <span className={styles.navIcon}>
          <CircleGauge
            size={20}
            strokeWidth={1.7}
          />
        </span>

        <span>Limit</span>
      </button>

      <button
        type="button"
        className={styles.navItem}
      >
        <span className={styles.navIcon}>
          <UserRound
            size={20}
            strokeWidth={1.7}
          />
        </span>

        <span>Profile</span>
      </button>
    </nav>
  );
}

export default BottomNav;