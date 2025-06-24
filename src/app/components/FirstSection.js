"use client";
import React from "react";
import Link from "next/link";

const FirstSection = () => {
  return (
    <div>
      <div className="first-section" style={styles.maindiv}>
        <div style={styles.firstDiv}>
          <div className="proud-box" style={styles.proudbox}>
            We are proudly
            <img
              style={{ height: "70px", width: "70px" }}
              src="/images/animflag.gif"
              loading="lazy"
            />
          </div>
          <div className="first-div-inner" style={styles.firstdivinner}>
            <p style={styles.head1}>
              For all your <span style={{ color: "#ff6f20" }}>packaging</span>{" "}
              needs
            </p>
            <div className="reelContainer">
              <div className="reelTrack">
                <img src="/images/boxes.png" alt="reel" className="reelImage" />
                <img
                  src="/images/shrink_wrap.png"
                  alt="reel"
                  className="reelImage"
                  loading="lazy"
                />

                <img
                  src="/images/coveralls.png"
                  alt="reel"
                  className="reelImage"
                  loading="lazy"
                />
                <img
                  src="/images/felt_pads.png"
                  alt="reel"
                  className="reelImage"
                  loading="lazy"
                />
                <img
                  src="/images/moving_blankets.png"
                  alt="reel"
                  className="reelImage"
                  loading="lazy"
                />
                <img
                  src="/images/clear-tape.png"
                  alt="reel"
                  className="reelImage"
                />
                <img
                  src="/images/green-tape.png"
                  alt="reel"
                  className="reelImage"
                />
                <img src="/images/red.png" alt="reel" className="reelImage" />
                <img
                  src="/images/gloves.png"
                  alt="reel"
                  className="reelImage"
                />
                <img
                  src="/images/garbage_bags.png"
                  alt="reel"
                  className="reelImage"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="head2" style={styles.head2}>
              From cardboard boxes to custom solutions
            </p>
            <div
              className="explore-btn-div"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: "30px",
                width: "100%",
              }}
            >
              <a
                className="explore-products-btn"
                style={{
                  ...styles.actionBtn,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                }}
                href="tel:+14377757688"
              >
                +1 437-775-7688
              </a>
              <p style={{ margin: 0 }}>OR</p>
              <Link
                className="explore-products-btn"
                style={styles.actionBtn}
                href="/products"
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
            <div style={styles.gridItem}>
              <img
                style={styles.icon}
                alt="delivery"
                src="images/free_delivery.png"
                loading="lazy"
              />
              <p>
                Free delivery within GTA<sup>*</sup>
              </p>
              <img
                src="/images/check.png"
                alt="check"
                height="30px"
                width="30px"
                loading="lazy"
              />
            </div>
            <div style={styles.gridItem}>
              <img
                style={styles.icon}
                alt="delivery"
                src="/images/time_delivery.png"
                loading="lazy"
              />
              <p>Next day delivery</p>
              <img
                src="/images/check.png"
                alt="check"
                height="30px"
                width="30px"
                loading="lazy"
              />
            </div>
            <div className="grid-item" style={styles.gridItem}>
              <img
                style={styles.icon}
                alt="delivery"
                src="/images/quality.png"
              />
              <p>High quality products</p>
              <img
                src="/images/check.png"
                alt="check"
                height="30px"
                width="30px"
                loading="lazy"
              />
            </div>
            <div className="grid-item" style={styles.gridItem}>
              <img
                style={styles.icon}
                alt="delivery"
                src="/images/affordable.png"
                loading="lazy"
              />
              <p>Affordable prices</p>
              <img
                src="/images/check.png"
                alt="check"
                height="30px"
                width="30px"
                loading="lazy"
              />
            </div>
            <div className="grid-item" style={styles.gridItem}>
              <img
                style={styles.icon}
                alt="delivery"
                src="/images/easy_return.png"
                loading="lazy"
              />
              <p>Easy Exchanges</p>
              <img
                src="/images/check.png"
                alt="check"
                height="30px"
                width="30px"
                loading="lazy"
              />
            </div>
            <div style={styles.gridItem}>
              <img
                style={styles.icon}
                alt="delivery"
                src="/images/no_min.png"
              />
              <p>No minimum order</p>
              <img
                src="/images/check.png"
                alt="check"
                height="30px"
                width="30px"
                loading="lazy"
              />
            </div>
            <div style={styles.gridItem}>
              <img
                style={styles.icon}
                alt="delivery"
                src="/images/discount.png"
                loading="lazy"
              />
              <p>Wholesale discounts</p>
              <img
                src="/images/check.png"
                alt="check"
                height="30px"
                width="30px"
                loading="lazy"
              />
            </div>
            <div className="grid-item" style={styles.gridItem}>
              <img
                style={styles.icon}
                alt="delivery"
                src="/images/custom.png"
              />
              <p>Custom solutions</p>
              <img
                src="/images/check.png"
                alt="check"
                height="30px"
                width="30px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="scroll-btn"
        onClick={() => {
          window.scrollTo({
            top: 700,
            behavior: "smooth",
          });
        }}
        style={{ width: "50px", margin: "20px auto", cursor: "pointer" }}
      >
        <img
          style={{
            width: "40px",
            border: "3px solid white",
            borderRadius: "50%",
          }}
          src="/images/darrow.png"
          alt="scroll down"
        />
      </div>
    </div>
  );
};
const styles = {
  maindiv: {
    marginTop: "8px",
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
    fontSize: "1.6rem",
    textAlign: "center",
    margin: 0,
  },
  head2: {
    fontSize: "1.4rem",
    margin: 0,
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

  proudbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    color: "rgba(0,0,0,0.9)",
    marginBottom: "8px",
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
};
export default FirstSection;
