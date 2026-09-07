import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  ChevronRight,
  MapPin,
} from "lucide-react";

import HeroBanner from "../components/HeroBanner";
import ShopTabs from "../components/ShopTabs";
import SearchBar from "../components/SearchBar";
import BrandCard from "../components/BrandCard";
import BottomNav from "../components/BottomNav";

import styles from "./Shop.module.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function Shop() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const tabFromUrl =
    searchParams.get("tab");

  const getInitialTab = () => {
    if (
      tabFromUrl === "marketplace" ||
      tabFromUrl === "nearby-stores" ||
      tabFromUrl === "top-brands"
    ) {
      return tabFromUrl;
    }

    return "top-brands";
  };

  const [
    activeTab,
    setActiveTab,
  ] = useState(getInitialTab);

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const handleTabChange = (
    tab
  ) => {
    setActiveTab(tab);

    setSearchParams({
      tab,
    });
  };

  useEffect(() => {
    if (
      tabFromUrl &&
      tabFromUrl !== activeTab &&
      [
        "top-brands",
        "nearby-stores",
        "marketplace",
      ].includes(tabFromUrl)
    ) {
      setActiveTab(tabFromUrl);
    }
  }, [
    tabFromUrl,
    activeTab,
  ]);

  useEffect(() => {
    if (
      activeTab !== "marketplace"
    ) {
      return;
    }

    const fetchProducts =
      async () => {
        try {
          setLoading(true);
          setError("");

          const response =
            await fetch(
              `${API_URL}/api/products`
            );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch products"
            );
          }

          const data =
            await response.json();

          setProducts(data);
        } catch (error) {
          console.error(
            "Error fetching products:",
            error
          );

          setError(
            "Unable to load marketplace products. Please try again."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, [activeTab]);

  useEffect(() => {
    setSearchTerm("");
  }, [activeTab]);

  const filteredProducts =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      if (!query) {
        return products;
      }

      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query)
      );
    }, [
      products,
      searchTerm,
    ]);

  return (
    <div
      className={
        styles.shopPage
      }
    >
      <HeroBanner />

      <ShopTabs
        activeTab={
          activeTab
        }
        setActiveTab={
          handleTabChange
        }
      />

      <SearchBar
        activeTab={
          activeTab
        }
        searchTerm={
          searchTerm
        }
        setSearchTerm={
          setSearchTerm
        }
      />

      <main
        className={
          styles.shopContent
        }
      >
        {activeTab ===
          "top-brands" && (
          <>
            <h2
              className={
                styles.sectionTitle
              }
            >
              Top Brands
            </h2>

            <div
              className={
                styles.brandList
              }
            >
              <BrandCard
                logo="A"
                name="Air India"
                description="No-cost EMIs upto 18 months"
              />

              <BrandCard
                logo="A"
                name="Apple Premium Reseller"
                description="No-cost EMIs upto 24 months"
              />
            </div>
          </>
        )}

        {activeTab ===
          "nearby-stores" && (
          <>
            <h2
              className={
                styles.sectionTitle
              }
            >
              Nearby Stores
            </h2>

            <div
              className={
                styles.nearbyEmptyCard
              }
            >
              <div
                className={
                  styles.nearbyLocationIcon
                }
              >
                <MapPin
                  size={24}
                  strokeWidth={
                    1.8
                  }
                />
              </div>

              <h3>
                Find stores near you
              </h3>

              <p>
                Nearby participating
                stores will appear
                here based on your
                location.
              </p>
            </div>
          </>
        )}

        {activeTab ===
          "marketplace" && (
          <>
            <div
              className={
                styles.marketplaceHeading
              }
            >
              <div>
                <h2
                  className={
                    styles.sectionTitle
                  }
                >
                  1Fi Marketplace
                </h2>

                <p
                  className={
                    styles.marketplaceSubtitle
                  }
                >
                  Shop products with
                  flexible no-cost
                  EMI plans.
                </p>
              </div>
            </div>

            {loading && (
              <div
                className={
                  styles.marketplaceLoading
                }
              >
                <div
                  className={
                    styles.marketplaceSkeleton
                  }
                >
                  <div
                    className={
                      styles.skeletonImage
                    }
                  />

                  <div
                    className={
                      styles.skeletonContent
                    }
                  >
                    <div
                      className={`${styles.skeletonLine} ${styles.skeletonTitle}`}
                    />

                    <div
                      className={
                        styles.skeletonLine
                      }
                    />

                    <div
                      className={`${styles.skeletonLine} ${styles.skeletonSmall}`}
                    />
                  </div>
                </div>

                <div
                  className={
                    styles.marketplaceSkeleton
                  }
                >
                  <div
                    className={
                      styles.skeletonImage
                    }
                  />

                  <div
                    className={
                      styles.skeletonContent
                    }
                  >
                    <div
                      className={`${styles.skeletonLine} ${styles.skeletonTitle}`}
                    />

                    <div
                      className={
                        styles.skeletonLine
                      }
                    />

                    <div
                      className={`${styles.skeletonLine} ${styles.skeletonSmall}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {!loading &&
              error && (
                <div
                  className={
                    styles.marketplaceErrorCard
                  }
                >
                  <p>
                    {error}
                  </p>
                </div>
              )}

            {!loading &&
              !error &&
              filteredProducts.length ===
                0 && (
                <div
                  className={
                    styles.marketplaceEmptySearch
                  }
                >
                  <h3>
                    No products found
                  </h3>

                  <p>
                    Try searching
                    with a different
                    product name.
                  </p>
                </div>
              )}

            {!loading &&
              !error &&
              filteredProducts.length >
                0 && (
                <div
                  className={
                    styles.marketplaceProductList
                  }
                >
                  {filteredProducts.map(
                    (
                      product
                    ) => {
                      const startingEmi =
                        Math.round(
                          Number(
                            product.base_price
                          ) / 12
                        );

                      return (
                        <Link
                          to={`/products/${product.slug}`}
                          className={
                            styles.marketplaceProductLink
                          }
                          key={
                            product.id
                          }
                        >
                          <article
                            className={
                              styles.marketplaceProductCard
                            }
                          >
                            <div
                              className={
                                styles.marketplaceProductImage
                              }
                            >
                              {product.image_url ? (
                                <img
                                  src={
                                    product.image_url
                                  }
                                  alt={
                                    product.name
                                  }
                                />
                              ) : (
                                <span>
                                  Product
                                </span>
                              )}
                            </div>

                            <div
                              className={
                                styles.marketplaceProductInfo
                              }
                            >
                              <div
                                className={
                                  styles.marketplaceProductTop
                                }
                              >
                                <h3>
                                  {
                                    product.name
                                  }
                                </h3>

                                <span
                                  className={
                                    styles.marketplaceArrow
                                  }
                                >
                                  <ChevronRight
                                    size={
                                      20
                                    }
                                    strokeWidth={
                                      1.8
                                    }
                                  />
                                </span>
                              </div>

                              <p
                                className={
                                  styles.marketplaceFrom
                                }
                              >
                                Starting
                                from
                              </p>

                              <p
                                className={
                                  styles.marketplaceProductPrice
                                }
                              >
                                ₹
                                {Number(
                                  product.base_price
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                              <div
                                className={
                                  styles.marketplaceEmiBox
                                }
                              >
                                <span
                                  className={
                                    styles.marketplaceEmiLabel
                                  }
                                >
                                  No-cost
                                  EMI
                                </span>

                                <span
                                  className={
                                    styles.marketplaceEmiValue
                                  }
                                >
                                  From ₹
                                  {startingEmi.toLocaleString(
                                    "en-IN"
                                  )}
                                  /month
                                </span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      );
                    }
                  )}
                </div>
              )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

export default Shop;