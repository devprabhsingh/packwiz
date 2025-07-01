"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/numberSheet";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Toast from "@/app/components/Toast";
const flatProducts = products.flat();

const MovingKit = () => {
  const { id } = useParams();
  const router = useRouter();
  const [kitData, setKitData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { addToCart, kit, setKit } = useCart();
  const [addedProductId, setAddedProductId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [toastTriggered, setToastTriggered] = useState(false);

  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => setAddedProductId(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  useEffect(() => {
    const selectedKit = products[12].find((item) => item.id === id);
    if (!selectedKit) return;

    const enrichedItems = selectedKit.items.map((kitItem) => {
      const itemDetails = flatProducts.find((p) => p.id === kitItem.id);
      return {
        ...itemDetails,
        qty: kitItem.qty,
        price: itemDetails?.priceTable?.tier3 || 0,
      };
    });

    setKitData({ ...selectedKit, items: enrichedItems });
  }, [id]);

  useEffect(() => {
    if (!kitData) return;
    const price = kitData.items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setTotalPrice(price);
  }, [kitData]);

  const updateQty = (index, delta) => {
    setKitData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index].qty = Math.max(0, updatedItems[index].qty + delta);
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const handleAddToCart = () => {
    setKit(true);
    addToCart({
      ...kitData,
      qty: 1,
    });
    setAddedProductId(kitData.id);
    setToastTriggered(true);
  };

  useEffect(() => {
    if (kit && toastTriggered) {
      setToast({
        show: true,
        message: (
          <>
            Item added!{" "}
            <a
              href="/cart?kit=true"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Go to cart
            </a>
          </>
        ),
        type: "success",
      });
      setToastTriggered(false); // reset
    }
  }, [kit, toastTriggered]);

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  if (!kitData)
    return (
      <div style={styles.loading}>
        <Image
          height={50}
          width={50}
          alt="loading..."
          src={"/images/loader.gif"}
        />
      </div>
    );

  return (
    <div style={styles.container} className="container">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
      <style>{responsiveCSS}</style>
      <h1 style={styles.title}>{kitData.title}</h1>
      <div className="kit-wrapper">
        <div className="left-pane">
          <h2 style={styles.subtitle}>What is Included</h2>
          <div className="scroll-box">
            {kitData.items.map((item, index) => (
              <div key={item.id} style={styles.card}>
                <Image
                  src={item.image || "/images/default.png"}
                  alt={item.id}
                  width={120}
                  height={120}
                  style={styles.image}
                />
                <p style={styles.name}>{item.title}</p>
                <p style={styles.desc}>{item.desc}</p>
                <div style={styles.controls}>
                  <button
                    style={styles.button}
                    onClick={() => updateQty(index, -1)}
                  >
                    -
                  </button>
                  <span style={styles.qty}>{item.qty}</span>
                  <button
                    style={styles.button}
                    onClick={() => updateQty(index, 1)}
                  >
                    +
                  </button>
                </div>
                <p style={styles.price}>
                  Subtotal: ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="right-pane">
          <p style={styles.description}>
            This moving kit is tailored for your space and includes a complete
            set of supplies needed for packing and protection.
          </p>
          <p style={styles.description}>
            You can increase or decrease the quantity of items in the kit. The
            price will update accordingly.
          </p>
          <h2 style={styles.total}>Total: ${totalPrice.toFixed(2)}</h2>
          <div style={styles.actions}>
            <button onClick={handleAddToCart} style={styles.actionButton}>
              Add to Cart
            </button>
            <button onClick={handleBuyNow} style={styles.buyButton}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "16px",
    paddingTop: 0,
    backgroundColor: "white",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#ff6f20",
    fontSize: "2rem",
    padding: "16px",
    marginTop: 0,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.3rem",
    marginBottom: "10px",
  },
  card: {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
  },
  image: {
    objectFit: "contain",
    marginBottom: "10px",
  },
  name: {
    fontSize: "1rem",
    color: "black",
    marginBottom: 0,
    minHeight: "30px",
  },
  desc: {
    marginTop: 0,
    color: "grey",
    minHeight: "30px",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#ff6f20",
    border: "none",
    color: "white",
    fontSize: "1.2rem",
    padding: "5px 10px",
    margin: "0 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  qty: {
    fontSize: "1rem",
    color: "#333",
  },
  price: {
    marginTop: "10px",
    color: "#333",
    fontWeight: "bold",
  },
  total: {
    fontSize: "1.4rem",
    color: "black",
    marginTop: "20px",
    textAlign: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: "#333",
    color: "white",
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buyButton: {
    backgroundColor: "#ff6f20",
    color: "white",
    padding: "10px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    padding: "100px",
    fontSize: "1.2rem",
  },
};

const responsiveCSS = `
.container{
  padding:0 !important;
}
.kit-wrapper {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.left-pane {
  flex: 2;
  background-color: #f1f1f1;
  border-radius: 10px;
  padding:10px;
  max-height: 70vh;
  overflow-y: auto;
}

.scroll-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  
}

.right-pane {
  flex: 1;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .container>h1{
    font-size:25px !important;
    padding:15px;
    margin:0 !important;
  }
  .kit-wrapper {
    flex-direction: column;
  }
  .left-pane, .right-pane {
    width: 90%;
    margin:auto;
  }
  .scroll-box {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  .right-pane {
    margin-top: 20px;
  }
}
`;

export default MovingKit;
