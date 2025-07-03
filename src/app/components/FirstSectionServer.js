import Image from "next/image";
import Link from "next/link";
import ScrollButton from "./ScrollButtonClient";

const FirstSectionServer = () => {
  return (
    <div>
      <div className="first-section" style={styles.maindiv}>
        <div style={styles.firstDiv}>
          <div className="proud-box" style={styles.proudbox}>
            <span style={{ fontWeight: "bold" }}>We are proudly</span>
            <Image
              src="/images/animflag.png"
              loading="lazy"
              alt="Canadian"
              width={40}
              height={40}
              style={{ margin: "10px" }}
            />
          </div>

          <div className="first-div-inner" style={styles.firstdivinner}>
            <h1 style={styles.head1}>
              Packwiz – Canada’s Trusted Packing Supplies Store
            </h1>

            <div className="reelContainer">
              <div className="reelTrack">
                {reelImages.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt="reel"
                    className="reelImage"
                    width={70}
                    height={70}
                  />
                ))}
              </div>
            </div>

            <p style={styles.head2}>From cardboard boxes to custom solutions</p>

            <div className="explore-btn-div" style={styles.buttonRow}>
              <a
                href="tel:+14377757688"
                className="explore-products-btn"
                style={styles.actionBtn}
              >
                +1 437-775-7688
              </a>
              <p style={{ margin: 0 }}>OR</p>
              <Link
                href="/products"
                className="explore-products-btn"
                style={styles.actionBtn}
              >
                Explore Products
              </Link>
            </div>
            <i style={{ marginTop: "15px" }}>
              Browse packaging solutions tailored to your needs
            </i>
          </div>
        </div>

        <div className="second-div" style={styles.seconddiv}>
          <div className="why-buy-grid" style={styles.gridContainer}>
            {features.map((feature, idx) => (
              <div key={idx} style={styles.gridItem}>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  style={styles.icon}
                  width={60}
                  height={60}
                />
                <p>{feature.title}</p>
                <Image
                  src="/images/check.png"
                  alt="check"
                  width={30}
                  height={30}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollButton />
    </div>
  );
};

const reelImages = [
  "/images/boxes-r.png",
  "/images/shrink_wrap-r.png",
  "/images/coveralls-r.png",
  "/images/felt_pads-r.png",
  "/images/moving_blankets-r.png",
  "/images/clear-tape-r.png",
  "/images/green-tape-r.png",
  "/images/red-r.png",
  "/images/gloves.png",
  "/images/garbage_bags-r.png",
];

const features = [
  { title: "Free delivery within GTA*", icon: "/images/free_delivery.png" },
  { title: "Next day delivery", icon: "/images/time_delivery.png" },
  { title: "High quality products", icon: "/images/quality.png" },
  { title: "Affordable prices", icon: "/images/affordable.png" },
  { title: "Easy Exchanges", icon: "/images/easy_return.png" },
  { title: "No minimum order", icon: "/images/no_min.png" },
  { title: "Wholesale discounts", icon: "/images/discount.png" },
  { title: "Custom solutions", icon: "/images/custom.png" },
];

const styles = {
  maindiv: {
    marginTop: "5px",
    height: "75vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  firstdivinner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "1rem",
    padding: "30px",
    backgroundColor: "white",
    color: "rgba(0,0,0,0.9)",
    borderRadius: "8px",
    boxShadow: "0 4px 4px rgba(0,0,0,0.1)",
  },
  head1: {
    fontSize: "1.3rem",
    textAlign: "center",
    margin: 0,
  },
  head2: {
    fontSize: "1.4rem",
    margin: 0,
    fontDisplay: "swap",
    textAlign: "center",
  },
  actionBtn: {
    width: "fit-content",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#ff6f20",
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
    boxShadow: "2px 2px 4px grey",
  },
  buttonRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: "30px",
    width: "100%",
  },
  proudbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    color: "rgba(0,0,0,0.9)",
    marginBottom: "5px",
    padding: "8px 15px",
    borderRadius: "8px",
    fontSize: "1.6rem",
    boxShadow: "0 4px 4px rgba(0,0,0,0.1)",
  },
  seconddiv: {
    flex: "0.7",
    padding: "0 16px",
    boxSizing: "border-box",
    overflowX: "hidden",
    maxWidth: "100%",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(2, auto)",
    gap: "8px",
    paddingTop: 0,
  },
  gridItem: {
    backgroundColor: "white",
    padding: "22px",
    textAlign: "center",
    fontSize: "1.2rem",
    borderRadius: "8px",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    boxShadow: "0 4px 4px rgba(0,0,0,0.1)",
  },
  icon: {
    height: "60px",
    width: "60px",
  },
  scrollBtn: {
    width: "50px",
    margin: "20px auto",
    cursor: "pointer",
  },
  scrollIcon: {
    width: "40px",
    border: "3px solid white",
    borderRadius: "50%",
  },
};

export default FirstSectionServer;
