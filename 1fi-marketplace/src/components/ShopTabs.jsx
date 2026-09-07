import styles from "./ShopTabs.module.css";

function ShopTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className={styles.shopTabsContainer}>
      <div className={styles.shopTabs}>
        <button
          type="button"
          className={`${styles.shopTab} ${
            activeTab === "top-brands"
              ? styles.activeTab
              : ""
          }`}
          onClick={() =>
            setActiveTab("top-brands")
          }
        >
          Top Brands
        </button>

        <button
          type="button"
          className={`${styles.shopTab} ${
            activeTab === "nearby-stores"
              ? styles.activeTab
              : ""
          }`}
          onClick={() =>
            setActiveTab("nearby-stores")
          }
        >
          Nearby Stores
        </button>

        <button
          type="button"
          className={`${styles.shopTab} ${
            activeTab === "marketplace"
              ? styles.activeTab
              : ""
          }`}
          onClick={() =>
            setActiveTab("marketplace")
          }
        >
          1Fi Marketplace
        </button>
      </div>
    </div>
  );
}

export default ShopTabs;