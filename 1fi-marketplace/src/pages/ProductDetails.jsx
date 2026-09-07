import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  X,
} from "lucide-react";

import styles from "./ProductDetails.module.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function ProductDetails() {
  const { slug } =
    useParams();

  const navigate =
    useNavigate();

  const [
    product,
    setProduct,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    selectedVariant,
    setSelectedVariant,
  ] = useState(null);

  const [
    selectedEmi,
    setSelectedEmi,
  ] = useState(null);

  const [
    showConfirmation,
    setShowConfirmation,
  ] = useState(false);

  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          setLoading(true);
          setError("");

          const response =
            await fetch(
              `${API_URL}/api/products/${slug}`
            );

          if (!response.ok) {
            throw new Error(
              "Product not found"
            );
          }

          const data =
            await response.json();

          setProduct(data);

          if (
            data.variants &&
            data.variants.length >
              0
          ) {
            setSelectedVariant(
              data.variants[0]
            );
          }

          if (
            data.emi_plans &&
            data.emi_plans.length >
              0
          ) {
            setSelectedEmi(
              data.emi_plans[0]
            );
          }
        } catch (error) {
          console.error(
            "Error fetching product:",
            error
          );

          setError(
            "Unable to load product details."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div
        className={
          styles.productDetailsPage
        }
      >
        <div
          className={
            styles.productMessage
          }
        >
          <p>
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (
    error ||
    !product
  ) {
    return (
      <div
        className={
          styles.productDetailsPage
        }
      >
        <div
          className={
            styles.productMessage
          }
        >
          <p>
            {error ||
              "Product not found."}
          </p>

          <button
            type="button"
            className={
              styles.messageBackButton
            }
            onClick={() =>
              navigate(
                "/shop?tab=marketplace"
              )
            }
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const displayPrice =
    selectedVariant?.price ||
    product.base_price;

  const calculateMonthlyEmi = (
    months
  ) => {
    if (!months) {
      return 0;
    }

    return Math.round(
      Number(displayPrice) /
        Number(months)
    );
  };

  const handleProceed =
    () => {
      if (
        !selectedVariant ||
        !selectedEmi
      ) {
        return;
      }

      setShowConfirmation(
        true
      );
    };

  return (
    <div
      className={
        styles.productDetailsPage
      }
    >
      <header
        className={
          styles.productHeader
        }
      >
        <button
          type="button"
          className={
            styles.productBackButton
          }
          onClick={() =>
            navigate(
              "/shop?tab=marketplace"
            )
          }
          aria-label="Go back to marketplace"
        >
          <ArrowLeft
            size={20}
            strokeWidth={1.8}
          />
        </button>

        <h2>
          Product details
        </h2>

        <div
          className={
            styles.productHeaderSpace
          }
        />
      </header>

      <div
        className={
          styles.productDetailImage
        }
      >
        <img
          src={
            product.image_url
          }
          alt={
            product.name
          }
        />
      </div>

      <section
        className={
          styles.productMainInfo
        }
      >
        <h1>
          {product.name}
        </h1>

        <p
          className={
            styles.productDetailDescription
          }
        >
          {
            product.description
          }
        </p>

        <div
          className={
            styles.productPriceArea
          }
        >
          <p
            className={
              styles.productPriceLabel
            }
          >
            Price
          </p>

          <p
            className={
              styles.productDetailPrice
            }
          >
            ₹
            {Number(
              displayPrice
            ).toLocaleString(
              "en-IN"
            )}
          </p>
        </div>
      </section>

      <section
        className={
          styles.productDetailSection
        }
      >
        <div
          className={
            styles.sectionHeadingRow
          }
        >
          <h2>
            Select Variant
          </h2>

          {selectedVariant && (
            <span
              className={
                styles.selectedLabel
              }
            >
              {
                selectedVariant.variant_value
              }
            </span>
          )}
        </div>

        <div
          className={
            styles.variantOptions
          }
        >
          {product.variants?.map(
            (
              variant
            ) => (
              <button
                key={
                  variant.id
                }
                type="button"
                className={`${styles.variantOption} ${
                  selectedVariant?.id ===
                  variant.id
                    ? styles.variantOptionSelected
                    : ""
                }`}
                onClick={() => {
                  setSelectedVariant(
                    variant
                  );

                  setShowConfirmation(
                    false
                  );
                }}
              >
                {
                  variant.variant_value
                }
              </button>
            )
          )}
        </div>
      </section>

      <section
        className={`${styles.productDetailSection} ${styles.emiSection}`}
      >
        <div
          className={
            styles.sectionHeadingRow
          }
        >
          <h2>
            Select EMI Plan
          </h2>

          <span
            className={
              styles.noCostBadge
            }
          >
            No-cost EMI
          </span>
        </div>

        <div
          className={
            styles.emiOptions
          }
        >
          {product.emi_plans?.map(
            (plan) => {
              const monthlyAmount =
                calculateMonthlyEmi(
                  plan.months
                );

              const isSelected =
                selectedEmi?.id ===
                plan.id;

              return (
                <button
                  key={
                    plan.id
                  }
                  type="button"
                  className={`${styles.emiOption} ${
                    isSelected
                      ? styles.emiOptionSelected
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedEmi(
                      plan
                    );

                    setShowConfirmation(
                      false
                    );
                  }}
                >
                  <div
                    className={
                      styles.emiLeft
                    }
                  >
                    <div
                      className={
                        styles.emiRadio
                      }
                    >
                      {isSelected && (
                        <div
                          className={
                            styles.emiRadioDot
                          }
                        />
                      )}
                    </div>

                    <div
                      className={
                        styles.emiPlanInfo
                      }
                    >
                      <strong>
                        {
                          plan.months
                        }{" "}
                        months
                      </strong>

                      <span>
                        No-cost
                        EMI
                      </span>
                    </div>
                  </div>

                  <div
                    className={
                      styles.emiPrice
                    }
                  >
                    <strong>
                      ₹
                      {monthlyAmount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <span>
                      /month
                    </span>
                  </div>
                </button>
              );
            }
          )}
        </div>
      </section>

      {selectedVariant &&
        selectedEmi && (
          <section
            className={
              styles.emiSummary
            }
          >
            <div
              className={
                styles.emiSummaryRow
              }
            >
              <span>
                Selected
                variant
              </span>

              <strong>
                {
                  selectedVariant.variant_value
                }
              </strong>
            </div>

            <div
              className={
                styles.emiSummaryRow
              }
            >
              <span>
                Tenure
              </span>

              <strong>
                {
                  selectedEmi.months
                }{" "}
                months
              </strong>
            </div>

            <div
              className={
                styles.emiSummaryRow
              }
            >
              <span>
                Monthly EMI
              </span>

              <strong
                className={
                  styles.summaryHighlight
                }
              >
                ₹
                {calculateMonthlyEmi(
                  selectedEmi.months
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>
          </section>
        )}

      {showConfirmation && (
        <div
          className={
            styles.confirmationOverlay
          }
        >
          <div
            className={
              styles.confirmationCard
            }
          >
            <button
              type="button"
              className={
                styles.confirmationClose
              }
              onClick={() =>
                setShowConfirmation(
                  false
                )
              }
              aria-label="Close confirmation"
            >
              <X
                size={18}
                strokeWidth={2}
              />
            </button>

            <div
              className={
                styles.confirmationIcon
              }
            >
              <CheckCircle2
                size={38}
                strokeWidth={
                  1.8
                }
              />
            </div>

            <h2>
              EMI plan selected
            </h2>

            <p
              className={
                styles.confirmationSubtitle
              }
            >
              Your selected
              product and EMI
              details are ready.
            </p>

            <div
              className={
                styles.confirmationDetails
              }
            >
              <div
                className={
                  styles.confirmationRow
                }
              >
                <span>
                  Product
                </span>

                <strong>
                  {
                    product.name
                  }
                </strong>
              </div>

              <div
                className={
                  styles.confirmationRow
                }
              >
                <span>
                  Variant
                </span>

                <strong>
                  {
                    selectedVariant.variant_value
                  }
                </strong>
              </div>

              <div
                className={
                  styles.confirmationRow
                }
              >
                <span>
                  Tenure
                </span>

                <strong>
                  {
                    selectedEmi.months
                  }{" "}
                  months
                </strong>
              </div>

              <div
                className={
                  styles.confirmationRow
                }
              >
                <span>
                  Monthly EMI
                </span>

                <strong
                  className={
                    styles.confirmationHighlight
                  }
                >
                  ₹
                  {calculateMonthlyEmi(
                    selectedEmi.months
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>
            </div>

            <button
              type="button"
              className={
                styles.confirmationDoneButton
              }
              onClick={() =>
                setShowConfirmation(
                  false
                )
              }
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div
        className={
          styles.productBottomBar
        }
      >
        <div
          className={
            styles.bottomEmiInfo
          }
        >
          {selectedEmi ? (
            <>
              <span>
                Monthly EMI
              </span>

              <strong>
                ₹
                {calculateMonthlyEmi(
                  selectedEmi.months
                ).toLocaleString(
                  "en-IN"
                )}
                /mo
              </strong>
            </>
          ) : (
            <span>
              Select an EMI
              plan
            </span>
          )}
        </div>

        <button
          type="button"
          className={
            styles.proceedButton
          }
          disabled={
            !selectedVariant ||
            !selectedEmi
          }
          onClick={
            handleProceed
          }
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;